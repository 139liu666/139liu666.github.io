### **Microsoft Flight Simulator 2024 Drone Show SDK Development**
**Sep 2025 – Jan 2026**

**Tech Stack: MSFS SDK, C++/WASM**<br>
Built low-level WASM plugin modules in C++ using the official MSFS 2024 SDK. Developed lifecycle management for the drone show system, high-frequency in-game environment monitoring, and a physics-aware safe teleportation mechanism.<br>
**Highlights:**<br>
Safe Teleportation State Machine: Designed a multi-stage teleportation state machine to address collisions and crashes caused by abrupt coordinate changes. The system uses the low-level SLEW_ON command to freeze aircraft altitude and attitude, then restores physics simulation seamlessly after safe long-distance teleportation.<br>
Environment Variable Monitoring: Read engine-level A-Vars for absolute 3D coordinates and E-Vars for day/night state at high frequency, enabling unobtrusive triggers and dynamic data loading when a player enters a five-kilometer radius at night.
### **Android Media Aggregation App Built with Jetpack Compose**
**Nov 2025 – Jan 2026**

**Tech Stack: Android, Kotlin, Jetpack Compose**<br>
Built a responsive movie browsing and tracking application using the official TMDB API, with popular-content discovery, real-time search, user authentication, and cloud-synchronized favorites.<br>
**Highlights:**<br>
Declarative UI and Architecture: Built the interface with Jetpack Compose and used MVVM to consolidate complex UI state in ViewModels. A unidirectional data flow keeps rendering stable and predictable.<br>
Complex Network Authentication and Abstraction: Integrated deeply with the TMDB API. Converted the callback-heavy OAuth login flow into sequential asynchronous logic with Kotlin coroutines, and implemented an OkHttp Interceptor to inject Bearer Tokens and Session IDs consistently while reducing duplicated code.<br>
High-Performance Lists and Responsive Interaction: Integrated Coil for asynchronous image loading and memory caching. Built grid views with LazyVerticalGrid and implemented automatic pagination by observing scrolling state.<br>
Data Persistence and State Synchronization: Used DataStore to store credentials safely in background threads without blocking the main thread. Favorites and watchlist actions synchronize with the server in real time and trigger targeted UI updates through state flows.

### **Unity 2D Side-Scrolling Game with Arduino Controls**
**Oct 2025 – Dec 2025**

**Tech Stack: Unity, C#, Arduino**<br>
Developed a 2D action platformer that combines software logic with physical hardware and supports Arduino, gamepad, and keyboard input and feedback.<br>
**Highlights:**<br>
Gameplay Systems: Implemented a complete 2D side-scrolling character controller with precise gravity feedback, double jump, wall jump, and teleportation mechanics. Used a state machine to manage complex character state transitions.<br>
Bidirectional Software-Hardware Synchronization: Developed a serial communication module that connects an Arduino UNO as a custom input device. Real-time game state, including health and level progress, is sent to an LED matrix and LCD display with very low latency.

### **Low-Level Development of a Mario-Style 2D Game with SFML and C++**
**May 2025 – Jul 2025**

**Tech Stack: SFML, C++**<br>
Built a complete Mario-style platform game with SFML, including character controls, gravity-based jumping, collision detection, and dynamic level updates.<br>
**Highlights:**<br>
Component-Based Entity Architecture: Replaced a simple inheritance tree with factory and composition patterns for GameObject instances, creating an extensible entity-component system with significantly improved decoupling.<br>
Physics and Collision: Implemented 2D AABB collision detection and gravity simulation from scratch without an off-the-shelf physics engine, resolving tunneling issues and providing precise, responsive character controls.
Memory and Resource Management: Adopted modern C++ smart pointers, including std::unique_ptr, to manage texture and audio lifecycles. Dynamic loading and unloading of level assets eliminated memory leaks and reduced peak runtime memory usage.

### **Independent Development of a Clash Royale-Style Unity 3D Strategy Game**
**Dec 2024 – Jan 2025**

**Tech Stack: Unity 3D, C#, DOTween, NavMesh**<br>
Independently developed a 1v1 real-time strategy and tower defense game with card drag-and-drop deployment, unit spawning and combat, automatic tower targeting, resource loops, and complete match-flow control.<br>
**Highlights:**<br>
Architecture and Global Management: Used a singleton GameManager for cross-scene lifecycle and global audio management. Built a UnitInfo data center and combined it with a factory pattern for dynamic unit instantiation and faction-property injection, making balancing more flexible.<br>
Core Combat Loop and UI Interaction: Recreated the deck cycle and used DOTween for smooth card UI animation. Combined UGUI drag interfaces with raycasting to validate precise card placement against 3D tags and real-time elixir availability.<br>
Entity State Machines and AI Navigation: Integrated NavMeshAgent for automatic pathfinding over complex terrain. Used OnTriggerEnter to maintain a live list of nearby enemies and encapsulated movement, nearest-target selection, attack cooldowns, and death-state logic.

### **IoT Smart Bin Using Edge Computing and MQTT**
**Jan 2025 – Feb 2025**

**Tech Stack: Python, Raspberry Pi, MQTT, Docker, JSON-LD, Home Assistant**<br>
Developed an end-to-end IoT smart-bin system with Python, MQTT, Docker, Raspberry Pi hardware, and Home Assistant, connecting physical sensing, JSON-LD semantics, asynchronous middleware, and cloud visualization.<br>
**Highlights:**<br>
Edge Data Collection: Developed edge scripts on Raspberry Pi to read and process PIR sensor states. Used JSON-LD to represent physical signals as standardized structured data.<br>
Asynchronous Messaging Decoupling: Deployed Mosquitto as an MQTT broker and used the publish/subscribe model to fully decouple the hardware sensing layer from cloud-side processing.<br>
Virtual Sensors and Cloud-Native Deployment: Developed Python virtual sensors to calculate bin fill level, containerized the complete data pipeline with Docker, and built a real-time dashboard in Home Assistant.

### **Cloud-Native Deployment of a Personal Website with Kubernetes and Microservices**
**Dec 2024 – Jan 2025**

**Tech Stack: Docker, Kubernetes, NGINX, MongoDB, Python/Flask**<br>
Migrated a personal web application from a local environment to a cloud-native architecture with highly available containerized services and dynamic external traffic routing.<br>
**Highlights:**<br>
Microservice Containerization and Local Orchestration: Containerized the Flask backend and MongoDB database independently. Used Docker Compose to build a complete local multi-container test environment, introduced NGINX as a reverse proxy, and validated load balancing and traffic distribution across multiple web instances.<br>
Kubernetes Deployment and Resource Management: Authored Kubernetes YAML manifests and migrated the complete service stack to a Kubernetes cluster. Configured multiple web replicas, precise CPU and memory requests and limits, and reliable internal service discovery between the web service and database with KubeDNS.<br>
High Availability and Gateway Access: Added tailored liveness probes for both the web server and database to support health monitoring and automatic recovery. Configured MetalLB-based Ingress resources as a single entry point for external HTTP traffic and implemented dynamic multi-domain routing.

### **Core Operating-System Kernel Features in xv6**
**Jun 2025 – Jul 2025**

**Tech Stack: C, xv6 (RISC-V), Operating Systems, Memory Management, Concurrency, Process Scheduling**<br>
Implemented core kernel features in MIT's xv6 teaching operating system for RISC-V, including system-call flow, preemptive process scheduling, shared memory, and file-backed mmap support.<br>
**Highlights:**<br>
System Calls and Low-Level Synchronization: Analyzed user-to-supervisor traps and trampoline routing, then implemented Linux Futex-like fwait/fwake primitives. Combined kernel spinlocks with SLEEPING/RUNNABLE process states and the sched() scheduler for safe blocking and wake-up on multicore systems.<br>
Hardware Interrupts and Preemptive Scheduling: Configured RISC-V CLINT timer interrupt registers and completed the interrupt path across kernel and user modes. Replaced non-preemptive behavior with tick-based preemptive round-robin scheduling to prevent a single process from monopolizing the CPU.<br>
Virtual and Shared Memory: Built cross-process shared memory through low-level physical-page allocation with kalloc and page-table mapping with mappages. Protected the global descriptor table with spinlocks for concurrency safety.
File-Backed Memory Mapping: Implemented foundational mmap and munmap system calls. Used the low-level readi filesystem interface to load files into user virtual memory while handling page-alignment boundaries, deepening understanding of virtual address spaces and multilevel page tables.

### **Advanced Graphics Rendering and Post-Processing for Unity HDRP**
**Jun 2025 – Jul 2025**

**Tech Stack: Unity 3D, C#, HLSL, Compute Shader, HDRP, Computer Graphics**<br>
Developed a graphics algorithm library for Unity's High Definition Render Pipeline using HLSL and Compute Shader, including custom physically based rendering, stylized post-processing, and high-performance distance-field generation.<br>
**Highlights:**<br>
Custom Lighting and PBR: Implemented Blinn-Phong lighting and a GGX microfacet-based PBR pipeline in handwritten HLSL rather than relying on standard engine materials. Added normal-map sampling, TBN-space conversion, a metallic/roughness workflow, and efficient CPU-to-GPU batching with C# MaterialPropertyBlock.<br>
Screen-Space Post-Processing with Custom Pass: Built a custom post-processing pipeline using depth textures with Sobel first-derivative and Laplacian second-derivative convolution for precise full-screen edge detection. Also developed single- and multi-pass dithering and halftone effects using Bayer matrices and high-frequency random noise.<br>
Jump Flood Algorithm and SDF Generation with Compute Shader: Implemented the Jump Flood Algorithm on the GPU to address traditional distance-field performance bottlenecks. Used C# CommandBuffer logic to control multi-pass Render Texture iterations with halved step sizes, generating global signed distance field textures efficiently, and developed companion shaders for gradients, edge highlights, and animated contour effects.
