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
const renderMarkdownSections = markdownTexts => {
    section_names.forEach((name, index) => {
        const container = document.getElementById(name + '-md');
        container.innerHTML = marked.parse(markdownTexts[index]);
        if (section_card_classes[name]) {
            groupMarkdownEntries(container, section_card_classes[name]);
        }
    });
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
        renderMarkdownSections(resources.slice(1));
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
