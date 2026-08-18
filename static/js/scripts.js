const content_dir = 'contents/'
const locale_dir = content_dir + 'i18n/'
const default_language = 'zh'
const language_storage_key = 'preferred-language'
const section_names = ['home', 'awards', 'experience', 'workexperience','publications'];
const section_card_classes = {
    experience: 'project-card',
    workexperience: 'career-card',
};
const language_content_dirs = {
    zh: content_dir,
    en: content_dir + 'en/',
};
const language_tags = {
    zh: 'zh-CN',
    en: 'en',
};
const organization_profiles = [
    {
        aliases: ['西安电子科技大学', 'Xidian University'],
        section: 'home',
        selector: 'p > strong',
        website: 'https://www.xidian.edu.cn/',
        logo: 'https://www.xidian.edu.cn/favicon.ico',
    },
    {
        aliases: ['巴黎理工学院(QS43)', 'Institut Polytechnique de Paris (QS #43)'],
        section: 'home',
        selector: 'p > strong',
        website: 'https://www.ip-paris.fr/',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/d/d2/Institut_polytechnique_de_Paris_logo.svg',
    },
    {
        aliases: ['网易(杭州)雷火', 'NetEase Leihuo, Hangzhou'],
        section: 'workexperience',
        selector: '.career-card > p:first-of-type > strong',
        website: 'https://leihuo.163.com/',
        logo: 'https://leihuo.163.com/favicon.ico',
    },
    {
        aliases: ['阿里巴巴', 'Alibaba'],
        section: 'workexperience',
        selector: '.career-card > p:first-of-type > strong',
        website: 'https://www.alibabagroup.com/',
        logo: 'https://ali-home-data.oss-cn-hangzhou.aliyuncs.com/ecms-files/886024452/227dd295-99df-4f13-86b8-767b17c69c04.png',
    },
];
let active_language = default_language;
let main_scroll_spy = null;
const getSavedLanguage = () => {
    try {
        const savedLanguage = localStorage.getItem(language_storage_key);
        return language_content_dirs[savedLanguage] ? savedLanguage : default_language;
    } catch {
        return default_language;
    }
};
const saveLanguage = language => {
    try {
        localStorage.setItem(language_storage_key, language);
    } catch {
        return;
    }
};
const fetchText = async path => {
    const response = await fetch(path);
    if (!response.ok) {
        throw new Error('Unable to load ' + path);
    }
    return response.text();
};
const applyLocaleConfig = config => {
    Object.keys(config).forEach(key => {
        const element = document.getElementById(key);
        if (element) {
            element.textContent = config[key];
        }
    });
};
const groupMarkdownEntries = (container, cardClass) => {
    let currentCard = null;
    Array.from(container.childNodes).forEach(node => {
        const isEntryHeading = node.nodeType === Node.ELEMENT_NODE && node.matches('h3');
        if (isEntryHeading) {
            currentCard = document.createElement('article');
            currentCard.className = 'entry-card ' + cardClass;
            container.insertBefore(currentCard, node);
        }
        if (currentCard) {
            currentCard.appendChild(node);
        }
    });
};
const createEntryDetails = (card, label, content, detailsId) => {
    const disclosure = document.createElement('details');
    const heading = document.createElement('summary');
    const headingIcon = document.createElement('i');
    const details = document.createElement('div');
    const detailsTitle = document.createElement('h4');
    const normalizedLabel = label.replace(/[：:]\s*$/, '');
    disclosure.className = 'entry-disclosure';
    heading.className = 'entry-details-heading';
    heading.setAttribute('aria-controls', detailsId);
    heading.setAttribute('aria-label', normalizedLabel);
    headingIcon.className = 'bi bi-chevron-down';
    headingIcon.setAttribute('aria-hidden', 'true');
    heading.appendChild(headingIcon);
    details.id = detailsId;
    details.className = 'entry-details';
    detailsTitle.className = 'entry-details-title';
    detailsTitle.textContent = normalizedLabel;
    details.append(detailsTitle, content);
    disclosure.addEventListener('toggle', () => {
        card.classList.toggle('is-expanded', disclosure.open);
        if (main_scroll_spy) {
            main_scroll_spy.refresh();
        }
    });
    disclosure.append(heading, details);
    card.appendChild(disclosure);
};
const makeProjectCardsExpandable = () => {
    document.querySelectorAll('#experience-md .project-card').forEach((card, index) => {
        const paragraphs = Array.from(card.children).filter(child => child.matches('p'));
        const contentParagraph = paragraphs[1];
        if (!contentParagraph) {
            return;
        }
        const labels = contentParagraph.querySelectorAll(':scope > strong');
        if (labels.length < 2) {
            return;
        }
        const detailLabel = labels[labels.length - 1];
        const detailParagraph = document.createElement('p');
        let detailNode = detailLabel.nextSibling;
        while (detailNode) {
            const nextNode = detailNode.nextSibling;
            detailParagraph.appendChild(detailNode);
            detailNode = nextNode;
        }
        if (detailParagraph.firstChild && detailParagraph.firstChild.nodeName === 'BR') {
            detailParagraph.firstChild.remove();
        }
        if (detailLabel.previousSibling && detailLabel.previousSibling.nodeName === 'BR') {
            detailLabel.previousSibling.remove();
        }
        const label = detailLabel.textContent.trim();
        detailLabel.remove();
        createEntryDetails(card, label, detailParagraph, 'project-details-' + index);
    });
};
const makeCareerCardsExpandable = () => {
    document.querySelectorAll('#workexperience-md .career-card').forEach((card, index) => {
        const detailLabel = card.querySelector(':scope > h4');
        if (!detailLabel) {
            return;
        }
        const detailContent = document.createDocumentFragment();
        let detailNode = detailLabel.nextSibling;
        while (detailNode) {
            const nextNode = detailNode.nextSibling;
            detailContent.appendChild(detailNode);
            detailNode = nextNode;
        }
        const label = detailLabel.textContent.trim();
        detailLabel.remove();
        createEntryDetails(card, label, detailContent, 'career-details-' + index);
    });
};
const createOrganizationProfile = (label, profile, index, language) => {
    const wrapper = document.createElement('span');
    const trigger = document.createElement('span');
    const popover = document.createElement('span');
    const logo = document.createElement('img');
    const information = document.createElement('span');
    const name = document.createElement('span');
    const website = document.createElement('a');
    wrapper.className = 'organization-profile';
    trigger.className = 'organization-trigger';
    trigger.tabIndex = 0;
    trigger.textContent = label;
    trigger.setAttribute('aria-controls', 'organization-profile-' + index);
    popover.id = 'organization-profile-' + index;
    popover.className = 'organization-popover';
    logo.className = 'organization-logo';
    logo.src = profile.logos ? profile.logos[language] : profile.logo;
    logo.alt = label;
    logo.loading = 'eager';
    logo.decoding = 'async';
    logo.referrerPolicy = 'no-referrer';
    information.className = 'organization-information';
    name.className = 'organization-name';
    name.textContent = label;
    website.href = profile.website;
    website.target = '_blank';
    website.rel = 'noopener noreferrer';
    website.textContent = new URL(profile.website).hostname.replace(/^www\./, '');
    information.append(name, website);
    popover.append(logo, information);
    wrapper.append(trigger, popover);
    return wrapper;
};
const wrapOrganizationAlias = (target, profile, index, language) => {
    const walker = document.createTreeWalker(target, NodeFilter.SHOW_TEXT);
    const textNodes = [];
    let textNode = walker.nextNode();
    while (textNode) {
        textNodes.push(textNode);
        textNode = walker.nextNode();
    }
    const matchedNode = textNodes.find(node => profile.aliases.some(alias => node.nodeValue.includes(alias)));
    if (!matchedNode) {
        return false;
    }
    const alias = profile.aliases.find(item => matchedNode.nodeValue.includes(item));
    const aliasIndex = matchedNode.nodeValue.indexOf(alias);
    const fragment = document.createDocumentFragment();
    const leadingText = matchedNode.nodeValue.slice(0, aliasIndex);
    const trailingText = matchedNode.nodeValue.slice(aliasIndex + alias.length);
    if (leadingText) {
        fragment.appendChild(document.createTextNode(leadingText));
    }
    fragment.appendChild(createOrganizationProfile(alias, profile, index, language));
    if (trailingText) {
        fragment.appendChild(document.createTextNode(trailingText));
    }
    matchedNode.replaceWith(fragment);
    return true;
};
const enhanceOrganizationProfiles = language => {
    organization_profiles.forEach((profile, index) => {
        const container = document.getElementById(profile.section + '-md');
        Array.from(container.querySelectorAll(profile.selector)).some(target => wrapOrganizationAlias(target, profile, index, language));
    });
};
const renderMarkdownSections = (markdownTexts, language) => {
    section_names.forEach((name, index) => {
        const container = document.getElementById(name + '-md');
        container.innerHTML = marked.parse(markdownTexts[index]);
        if (section_card_classes[name]) {
            groupMarkdownEntries(container, section_card_classes[name]);
        }
    });
    makeProjectCardsExpandable();
    makeCareerCardsExpandable();
    enhanceOrganizationProfiles(language);
};
const typesetMathematics = async () => {
    if (!window.MathJax) {
        return;
    }
    if (MathJax.typesetClear) {
        MathJax.typesetClear();
    }
    if (MathJax.typesetPromise) {
        await MathJax.typesetPromise();
    } else if (MathJax.typeset) {
        MathJax.typeset();
    }
};
const loadLanguage = async language => {
    const resolvedLanguage = language_content_dirs[language] ? language : default_language;
    const languageToggle = document.getElementById('language-toggle');
    languageToggle.disabled = true;
    document.body.setAttribute('aria-busy', 'true');
    try {
        const resources = await Promise.all([
            fetchText(locale_dir + resolvedLanguage + '.yml'),
            ...section_names.map(name => fetchText(language_content_dirs[resolvedLanguage] + name + '.md')),
        ]);
        applyLocaleConfig(jsyaml.load(resources[0]));
        renderMarkdownSections(resources.slice(1), resolvedLanguage);
        document.documentElement.lang = language_tags[resolvedLanguage];
        active_language = resolvedLanguage;
        saveLanguage(resolvedLanguage);
        await typesetMathematics();
        if (main_scroll_spy) {
            main_scroll_spy.refresh();
        }
    } catch (error) {
        console.error('Unable to switch language', error);
    } finally {
        languageToggle.disabled = false;
        document.body.removeAttribute('aria-busy');
    }
};


window.addEventListener('DOMContentLoaded', event => {

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        main_scroll_spy = new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            offset: 74,
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });


    // Language
    active_language = getSavedLanguage();
    const languageToggle = document.getElementById('language-toggle');
    languageToggle.addEventListener('click', () => {
        const nextLanguage = active_language === 'zh' ? 'en' : 'zh';
        loadLanguage(nextLanguage);
        if (window.getComputedStyle(navbarToggler).display !== 'none') {
            navbarToggler.click();
        }
    });

    marked.use({ mangle: false, headerIds: false })


    loadLanguage(active_language);

}); 
