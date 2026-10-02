const {
    useEffect,
    useMemo,
    useState
} = React;


/* =========================================
   ICON COMPONENT
========================================= */

function Icon({
    name,
    size = 20
}) {

    const icons = {

        arrow: `
            <path d="M5 12h14"/>
            <path d="m13 6 6 6-6 6"/>
        `,

        sun: `
            <circle cx="12" cy="12" r="4"/>
            <path d="M12 2v2"/>
            <path d="M12 20v2"/>
            <path d="m4.93 4.93 1.42 1.42"/>
            <path d="m17.65 17.65 1.42 1.42"/>
            <path d="M2 12h2"/>
            <path d="M20 12h2"/>
            <path d="m4.93 19.07 1.42-1.42"/>
            <path d="m17.65 6.35 1.42-1.42"/>
        `,

        moon: `
            <path d="M20.5 14.7A8.5 8.5 0 0 1 9.3 3.5"/>
            <path d="A8.5 8.5 0 1 0 20.5 14.7Z"/>
        `,

        menu: `
            <path d="M4 7h16"/>
            <path d="M4 12h16"/>
            <path d="M4 17h16"/>
        `,

        close: `
            <path d="m6 6 12 12"/>
            <path d="m18 6-12 12"/>
        `,

        code: `
            <path d="m8 9-4 3 4 3"/>
            <path d="m16 9 4 3-4 3"/>
            <path d="m14 5-4 14"/>
        `,

        palette: `
            <circle cx="12" cy="12" r="9"/>
            <circle cx="8" cy="10" r="1"/>
            <circle cx="12" cy="7" r="1"/>
            <circle cx="16" cy="10" r="1"/>
        `,

        bolt: `
            <path d="m13 2-9 12h7l-1 8 9-12h-7l1-8Z"/>
        `,

        shield: `
            <path d="M12 3 5 6v5c0 4.5 3 8 7 10 4-2 7-5.5 7-10V6l-7-3Z"/>
            <path d="m9 12 2 2 4-4"/>
        `,

        mail: `
            <rect x="3" y="5" width="18" height="14" rx="2"/>
            <path d="m3 7 9 6 9-6"/>
        `,

        phone: `
            <path d="M6.6 3.5 9 3l2 5-2 1.5a14 14 0 0 0 5.5 5.5L16 13l5 2-.5 2.4A3 3 0 0 1 17.6 20C9.8 19.2 4.8 14.2 4 6.4A3 3 0 0 1 6.6 3.5Z"/>
        `,

        check: `
            <path d="m5 12 4 4L19 6"/>
        `,

        monitor: `
            <rect x="3" y="4" width="18" height="13" rx="2"/>
            <path d="M8 21h8"/>
            <path d="M12 17v4"/>
        `,

        layers: `
            <path d="m12 3 9 5-9 5-9-5 9-5Z"/>
            <path d="m3 12 9 5 9-5"/>
            <path d="m3 16 9 5 9-5"/>
        `,

        globe: `
            <circle cx="12" cy="12" r="9"/>
            <path d="M3 12h18"/>
            <path d="M12 3a14 14 0 0 1 0 18"/>
            <path d="M12 3a14 14 0 0 0 0 18"/>
        `,

        spark: `
            <path d="m12 2 1.7 6.3L20 10l-6.3 1.7L12 18l-1.7-6.3L4 10l6.3-1.7L12 2Z"/>
            <path d="m19 17 .6 2.4L22 20l-2.4.6L19 23l-.6-2.4L16 20l2.4-.6L19 17Z"/>
        `
    };

    return React.createElement(
        "svg",
        {
            width: size,
            height: size,
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: "1.8",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            dangerouslySetInnerHTML: {
                __html:
                    icons[name] ||
                    icons.spark
            }
        }
    );
}


/* =========================================
   MAIN APP
========================================= */

function App() {

    const [menuOpen, setMenuOpen] =
        useState(false);

    const [dark, setDark] =
        useState(
            () =>
                localStorage.getItem(
                    "nexora-theme"
                ) !== "light"
        );

    const [activeFilter, setActiveFilter] =
        useState("All");

    const [selectedProject, setSelectedProject] =
        useState(null);

    const [toast, setToast] =
        useState("");

    const [form, setForm] =
        useState({
            name: "",
            email: "",
            subject: "",
            message: ""
        });

    const [errors, setErrors] =
        useState({});


    /* =========================================
       PROJECT DATA
    ========================================= */

    const projects = [

        {
            title: "Nova Analytics",
            category: "Web Apps",
            cover: "cover-one",

            description:
                "A modern analytics dashboard designed for fast decisions and clear reporting.",

            tags: [
                "Dashboard",
                "Charts",
                "Responsive"
            ],

            features: [
                "Responsive dashboard layout",
                "Interactive metric cards",
                "Modern data visualization"
            ]
        },

        {
            title: "Finora Banking",
            category: "UI/UX",
            cover: "cover-two",

            description:
                "A clean financial experience with intuitive flows and trust-focused design.",

            tags: [
                "FinTech",
                "UX",
                "Mobile"
            ],

            features: [
                "Mobile-first account UI",
                "Transaction experience",
                "Reusable design system"
            ]
        },

        {
            title: "Vela Commerce",
            category: "Websites",
            cover: "cover-three",

            description:
                "A premium e-commerce interface focused on product discovery and conversion.",

            tags: [
                "E-commerce",
                "Animation",
                "SEO"
            ],

            features: [
                "Product discovery",
                "Responsive navigation",
                "Conversion-focused CTA"
            ]
        },

        {
            title: "Orbit Workspace",
            category: "Web Apps",
            cover: "cover-four",

            description:
                "A collaborative workspace interface for projects, tasks and team activity.",

            tags: [
                "SaaS",
                "Productivity",
                "Team"
            ],

            features: [
                "Project overview",
                "Activity timeline",
                "Team collaboration UI"
            ]
        },

        {
            title: "Astra Studio",
            category: "Websites",
            cover: "cover-five",

            description:
                "A creative studio website with bold typography, visual rhythm and motion.",

            tags: [
                "Creative",
                "Branding",
                "Motion"
            ],

            features: [
                "Animated hero",
                "Portfolio grid",
                "Contact conversion flow"
            ]
        },

        {
            title: "Greenline Health",
            category: "UI/UX",
            cover: "cover-six",

            description:
                "A calm and accessible healthcare interface that keeps important information easy to find.",

            tags: [
                "Healthcare",
                "Accessible",
                "Mobile"
            ],

            features: [
                "Accessible contrast",
                "Appointment flow",
                "Responsive information architecture"
            ]
        }
    ];


    /* =========================================
       FILTER PROJECTS
    ========================================= */

    const filteredProjects =
        useMemo(() => {

            if (activeFilter === "All") {
                return projects;
            }

            return projects.filter(
                project =>
                    project.category ===
                    activeFilter
            );

        }, [activeFilter]);


    /* =========================================
       THEME
    ========================================= */

    useEffect(() => {

        document.body.classList.toggle(
            "light",
            !dark
        );

        localStorage.setItem(
            "nexora-theme",
            dark ? "dark" : "light"
        );

    }, [dark]);


    /* =========================================
       SCROLL EFFECTS
    ========================================= */

    useEffect(() => {

        const handleScroll = () => {

            const nav =
                document.querySelector(".nav");

            const backTop =
                document.querySelector(".back-top");

            if (nav) {
                nav.classList.toggle(
                    "scrolled",
                    window.scrollY > 25
                );
            }

            if (backTop) {
                backTop.classList.toggle(
                    "show",
                    window.scrollY > 600
                );
            }

            const sections =
                [
                    ...document.querySelectorAll(
                        "section[id]"
                    )
                ];

            let current = null;

            sections.forEach(section => {

                if (
                    window.scrollY >=
                    section.offsetTop - 180
                ) {
                    current =
                        section.id;
                }

            });

            document
                .querySelectorAll(
                    ".nav-links a"
                )
                .forEach(link => {

                    link.classList.toggle(
                        "active",
                        link.getAttribute(
                            "href"
                        ) === `#${current}`
                    );

                });
        };


        window.addEventListener(
            "scroll",
            handleScroll,
            { passive: true }
        );


        const observer =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (
                            entry.isIntersecting
                        ) {
                            entry.target.classList.add(
                                "visible"
                            );
                        }

                    });

                },
                {
                    threshold: 0.12
                }
            );


        document
            .querySelectorAll(".reveal")
            .forEach(element =>
                observer.observe(element)
            );


        handleScroll();


        return () => {

            window.removeEventListener(
                "scroll",
                handleScroll
            );

            observer.disconnect();
        };

    }, [activeFilter]);


    /* =========================================
       TOAST
    ========================================= */

    const showToast = message => {

        setToast(message);

        clearTimeout(
            window.toastTimer
        );

        window.toastTimer =
            setTimeout(
                () => setToast(""),
                3000
            );
    };


    /* =========================================
       NAVIGATION
    ========================================= */

    const scrollTo = id => {

        setMenuOpen(false);

        document
            .querySelector(id)
            ?.scrollIntoView({
                behavior: "smooth"
            });
    };


    /* =========================================
       FORM VALIDATION
    ========================================= */

    const validateForm = () => {

        const newErrors = {};


        if (!form.name.trim()) {

            newErrors.name =
                "Please enter your name.";
        }


        if (
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/
                .test(form.email)
        ) {

            newErrors.email =
                "Please enter a valid email.";
        }


        if (!form.subject.trim()) {

            newErrors.subject =
                "Please add a subject.";
        }


        if (
            form.message.trim().length < 15
        ) {

            newErrors.message =
                "Message must contain at least 15 characters.";
        }


        setErrors(newErrors);

        return (
            Object.keys(newErrors)
                .length === 0
        );
    };


    const submitForm = event => {

        event.preventDefault();

        if (!validateForm()) {
            return;
        }


        showToast(
            "Message validated successfully!"
        );


        setForm({
            name: "",
            email: "",
            subject: "",
            message: ""
        });

        setErrors({});
    };


    /* =========================================
       RENDER
    ========================================= */

    return React.createElement(
        React.Fragment,
        null,

        /* Background */
        React.createElement(
            "div",
            {
                className:
                    "bg-orb orb-a"
            }
        ),

        React.createElement(
            "div",
            {
                className:
                    "bg-orb orb-b"
            }
        ),


        /* =====================================
           NAVIGATION
        ===================================== */

        React.createElement(
            "nav",
            {
                className: "nav"
            },

            React.createElement(
                "div",
                {
                    className:
                        "container nav-inner"
                },

                React.createElement(
                    "a",
                    {
                        className: "brand",
                        href: "#home",
                        onClick: () =>
                            setMenuOpen(false)
                    },

                    React.createElement(
                        "span",
                        {
                            className:
                                "brand-mark"
                        },
                        React.createElement(
                            Icon,
                            {
                                name: "spark",
                                size: 20
                            }
                        )
                    ),

                    "Nexora"
                ),


                React.createElement(
                    "div",
                    {
                        className:
                            `nav-links ${
                                menuOpen
                                    ? "open"
                                    : ""
                            }`
                    },

                    [
                        "home",
                        "services",
                        "work",
                        "about",
                        "contact"
                    ].map(id =>
                        React.createElement(
                            "a",
                            {
                                key: id,
                                href: `#${id}`,
                                onClick: () =>
                                    setMenuOpen(false)
                            },
                            id
                                .charAt(0)
                                .toUpperCase() +
                                id.slice(1)
                        )
                    )
                ),


                React.createElement(
                    "div",
                    {
                        className:
                            "nav-actions"
                    },

                    React.createElement(
                        "button",
                        {
                            className:
                                "icon-btn",
                            "aria-label":
                                "Toggle theme",
                            onClick: () =>
                                setDark(
                                    value =>
                                        !value
                                )
                        },

                        React.createElement(
                            Icon,
                            {
                                name:
                                    dark
                                        ? "sun"
                                        : "moon",
                                size: 18
                            }
                        )
                    ),


                    React.createElement(
                        "button",
                        {
                            className:
                                "btn btn-primary btn-sm",

                            onClick: () =>
                                scrollTo(
                                    "#contact"
                                )
                        },

                        "Start a project"
                    ),


                    React.createElement(
                        "button",
                        {
                            className:
                                "menu-btn",

                            "aria-label":
                                "Open menu",

                            onClick: () =>
                                setMenuOpen(
                                    value =>
                                        !value
                                )
                        },

                        React.createElement(
                            Icon,
                            {
                                name:
                                    menuOpen
                                        ? "close"
                                        : "menu",
                                size: 20
                            }
                        )
                    )
                )
            )
        ),


        /* =====================================
           MAIN
        ===================================== */

        React.createElement(
            "main",
            null,


            /* =================================
               HERO
            ================================= */

            React.createElement(
                "section",
                {
                    id: "home",
                    className: "hero"
                },

                React.createElement(
                    "div",
                    {
                        className:
                            "container hero-grid"
                    },


                    React.createElement(
                        "div",
                        {
                            className:
                                "hero-copy reveal"
                        },

                        React.createElement(
                            "div",
                            {
                                className:
                                    "eyebrow"
                            },
                            "Frontend Development"
                        ),

                        React.createElement(
                            "h1",
                            null,

                            "Digital experiences that ",

                            React.createElement(
                                "span",
                                {
                                    className:
                                        "gradient-text"
                                },
                                "feel alive."
                            )
                        ),

                        React.createElement(
                            "p",
                            null,

                            "A polished, responsive frontend crafted with semantic HTML, modern CSS, JavaScript and reusable React components — with performance, accessibility and delightful motion built in."
                        ),

                        React.createElement(
                            "div",
                            {
                                className:
                                    "hero-buttons"
                            },

                            React.createElement(
                                "button",
                                {
                                    className:
                                        "btn btn-primary",

                                    onClick: () =>
                                        scrollTo(
                                            "#work"
                                        )
                                },

                                "Explore our work",

                                React.createElement(
                                    Icon,
                                    {
                                        name: "arrow",
                                        size: 18
                                    }
                                )
                            ),

                            React.createElement(
                                "button",
                                {
                                    className:
                                        "btn btn-ghost",

                                    onClick: () =>
                                        scrollTo(
                                            "#contact"
                                        )
                                },

                                "Let's talk"
                            )
                        ),

                        React.createElement(
                            "div",
                            {
                                className:
                                    "hero-meta"
                            },

                            React.createElement(
                                "div",
                                null,

                                React.createElement(
                                    "strong",
                                    null,
                                    "100%"
                                ),

                                " Responsive"
                            ),

                            React.createElement(
                                "div",
                                null,

                                React.createElement(
                                    "strong",
                                    null,
                                    "A11y"
                                ),

                                " Focused"
                            ),

                            React.createElement(
                                "div",
                                null,

                                React.createElement(
                                    "strong",
                                    null,
                                    "60fps"
                                ),

                                " Motion"
                            )
                        )
                    ),


                    /* HERO VISUAL */

                    React.createElement(
                        "div",
                        {
                            className:
                                "hero-visual reveal delay-2"
                        },

                        React.createElement(
                            "div",
                            {
                                className:
                                    "glow-ring"
                            }
                        ),

                        React.createElement(
                            "div",
                            {
                                className:
                                    "badge-float badge-a"
                            },
                            "✦ Smooth interactions"
                        ),

                        React.createElement(
                            "div",
                            {
                                className:
                                    "badge-float badge-b"
                            },
                            "✓ Mobile ready"
                        ),

                        React.createElement(
                            "div",
                            {
                                className:
                                    "dashboard-card"
                            },

                            React.createElement(
                                "div",
                                {
                                    className:
                                        "card-top"
                                },

                                React.createElement(
                                    "div",
                                    {
                                        className:
                                            "dots"
                                    },

                                    React.createElement(
                                        "i"
                                    ),

                                    React.createElement(
                                        "i"
                                    ),

                                    React.createElement(
                                        "i"
                                    )
                                ),

                                React.createElement(
                                    "span",
                                    {
                                        className:
                                            "mini-label"
                                    },
                                    "LIVE OVERVIEW"
                                )
                            ),

                            React.createElement(
                                "div",
                                {
                                    className:
                                        "chart"
                                },

                                React.createElement(
                                    "div",
                                    {
                                        className:
                                            "chart-grid"
                                    }
                                ),

                                React.createElement(
                                    "svg",
                                    {
                                        viewBox:
                                            "0 0 400 150",
                                        preserveAspectRatio:
                                            "none"
                                    },

                                    React.createElement(
                                        "defs",
                                        null,

                                        React.createElement(
                                            "linearGradient",
                                            {
                                                id:
                                                    "area",
                                                x1: "0",
                                                x2: "0",
                                                y1: "0",
                                                y2: "1"
                                            },

                                            React.createElement(
                                                "stop",
                                                {
                                                    offset:
                                                        "0%",
                                                    stopColor:
                                                        "#8f82ff",
                                                    stopOpacity:
                                                        ".4"
                                                }
                                            ),

                                            React.createElement(
                                                "stop",
                                                {
                                                    offset:
                                                        "100%",
                                                    stopColor:
                                                        "#8f82ff",
                                                    stopOpacity:
                                                        "0"
                                                }
                                            )
                                        )
                                    ),

                                    React.createElement(
                                        "path",
                                        {
                                            d:
                                                "M0 126 C45 118 55 75 92 92 S142 110 174 67 S224 76 256 54 S303 77 330 34 S370 45 400 16 V150 H0Z",
                                            fill:
                                                "url(#area)"
                                        }
                                    ),

                                    React.createElement(
                                        "path",
                                        {
                                            d:
                                                "M0 126 C45 118 55 75 92 92 S142 110 174 67 S224 76 256 54 S303 77 330 34 S370 45 400 16",
                                            fill:
                                                "none",
                                            stroke:
                                                "#9b8cff",
                                            strokeWidth:
                                                "4",
                                            strokeLinecap:
                                                "round"
                                        }
                                    )
                                )
                            ),

                            React.createElement(
                                "div",
                                {
                                    className:
                                        "stat-row"
                                },

                                React.createElement(
                                    "div",
                                    {
                                        className:
                                            "mini-stat"
                                    },

                                    React.createElement(
                                        "strong",
                                        null,
                                        "+42%"
                                    ),

                                    React.createElement(
                                        "span",
                                        null,
                                        "Engagement"
                                    )
                                ),

                                React.createElement(
                                    "div",
                                    {
                                        className:
                                            "mini-stat"
                                    },

                                    React.createElement(
                                        "strong",
                                        null,
                                        "98.4"
                                    ),

                                    React.createElement(
                                        "span",
                                        null,
                                        "Performance"
                                    )
                                ),

                                React.createElement(
                                    "div",
                                    {
                                        className:
                                            "mini-stat"
                                    },

                                    React.createElement(
                                        "strong",
                                        null,
                                        "4.9/5"
                                    ),

                                    React.createElement(
                                        "span",
                                        null,
                                        "Experience"
                                    )
                                )
                            )
                        )
                    )
                )
            ),


            /* =================================
               SERVICES
            ================================= */

            React.createElement(
                "section",
                {
                    id: "services",
                    className: "section"
                },

                React.createElement(
                    "div",
                    {
                        className:
                            "container"
                    },

                    React.createElement(
                        "div",
                        {
                            className:
                                "section-head reveal"
                        },

                        React.createElement(
                            "div",
                            {
                                className:
                                    "eyebrow"
                            },
                            "What we build"
                        ),

                        React.createElement(
                            "h2",
                            null,
                            "A frontend that works as beautifully as it looks."
                        ),

                        React.createElement(
                            "p",
                            null,
                            "Every detail is designed around usability, responsiveness, maintainability and a premium visual experience."
                        )
                    ),


                    React.createElement(
                        "div",
                        {
                            className:
                                "services-grid"
                        },

                        [
                            [
                                "code",
                                "Responsive Development",
                                "Layouts that adapt smoothly from compact phones to large desktop displays."
                            ],

                            [
                                "palette",
                                "Modern UI Design",
                                "Clear visual hierarchy, balanced spacing and a consistent design language."
                            ],

                            [
                                "bolt",
                                "Micro-interactions",
                                "Subtle hover states, transitions and feedback that make the interface feel alive."
                            ],

                            [
                                "shield",
                                "Accessible by Default",
                                "Keyboard-friendly controls, readable contrast and semantic structure."
                            ],

                            [
                                "layers",
                                "Reusable Components",
                                "React-powered components and organized CSS/JS for scalable development."
                            ],

                            [
                                "monitor",
                                "Performance Focus",
                                "Lean assets, efficient interactions and a responsive experience."
                            ]
                        ].map(
                            (
                                service,
                                index
                            ) =>
                                React.createElement(
                                    "article",
                                    {
                                        className:
                                            `service-card reveal delay-${
                                                (index % 3) +
                                                1
                                            }`,
                                        key:
                                            service[1]
                                    },

                                    React.createElement(
                                        "div",
                                        {
                                            className:
                                                "service-icon"
                                        },

                                        React.createElement(
                                            Icon,
                                            {
                                                name:
                                                    service[0],
                                                size: 22
                                            }
                                        )
                                    ),

                                    React.createElement(
                                        "h3",
                                        null,
                                        service[1]
                                    ),

                                    React.createElement(
                                        "p",
                                        null,
                                        service[2]
                                    )
                                )
                        )
                    )
                )
            ),


            /* =================================
               WORK
            ================================= */

            React.createElement(
                "section",
                {
                    id: "work",
                    className: "section"
                },

                React.createElement(
                    "div",
                    {
                        className:
                            "container"
                    },

                    React.createElement(
                        "div",
                        {
                            className:
                                "section-head reveal"
                        },

                        React.createElement(
                            "div",
                            {
                                className:
                                    "eyebrow"
                            },
                            "Selected work"
                        ),

                        React.createElement(
                            "h2",
                            null,
                            "Interfaces built for real users."
                        ),

                        React.createElement(
                            "p",
                            null,
                            "Explore a selection of product, website and dashboard concepts. Click any project for a quick case-study view."
                        )
                    ),


                    React.createElement(
                        "div",
                        {
                            className:
                                "projects-toolbar"
                        },

                        React.createElement(
                            "div",
                            {
                                className:
                                    "filters"
                            },

                            [
                                "All",
                                "Websites",
                                "Web Apps",
                                "UI/UX"
                            ].map(
                                filter =>
                                    React.createElement(
                                        "button",
                                        {
                                            key:
                                                filter,

                                            className:
                                                `filter ${
                                                    activeFilter ===
                                                    filter
                                                        ? "active"
                                                        : ""
                                                }`,

                                            onClick:
                                                () =>
                                                    setActiveFilter(
                                                        filter
                                                    )
                                        },

                                        filter
                                    )
                            )
                        ),

                        React.createElement(
                            "span",
                            {
                                className:
                                    "mini-label"
                            },

                            `${filteredProjects.length} projects`
                        )
                    ),


                    React.createElement(
                        "div",
                        {
                            className:
                                "project-grid"
                        },

                        filteredProjects.map(
                            (
                                project,
                                index
                            ) =>
                                React.createElement(
                                    "article",
                                    {
                                        className:
                                            `project-card reveal delay-${
                                                (index % 3) +
                                                1
                                            }`,

                                        key:
                                            project.title,

                                        onClick:
                                            () =>
                                                setSelectedProject(
                                                    project
                                                )
                                    },

                                    React.createElement(
                                        "div",
                                        {
                                            className:
                                                `project-cover ${project.cover}`
                                        },

                                        React.createElement(
                                            "div",
                                            {
                                                className:
                                                    "project-mock"
                                            },

                                            React.createElement(
                                                "div",
                                                {
                                                    className:
                                                        "mock-line"
                                                }
                                            ),

                                            React.createElement(
                                                "div",
                                                {
                                                    className:
                                                        "mock-line",
                                                    style: {
                                                        width:
                                                            "42%"
                                                    }
                                                }
                                            ),

                                            React.createElement(
                                                "div",
                                                {
                                                    className:
                                                        "mock-blocks"
                                                },

                                                React.createElement(
                                                    "span"
                                                ),

                                                React.createElement(
                                                    "span"
                                                )
                                            )
                                        )
                                    ),

                                    React.createElement(
                                        "div",
                                        {
                                            className:
                                                "project-info"
                                        },

                                        React.createElement(
                                            "h3",
                                            null,
                                            project.title
                                        ),

                                        React.createElement(
                                            "p",
                                            null,
                                            project.description
                                        ),

                                        React.createElement(
                                            "div",
                                            {
                                                className:
                                                    "tags"
                                            },

                                            project.tags.map(
                                                tag =>
                                                    React.createElement(
                                                        "span",
                                                        {
                                                            className:
                                                                "tag",
                                                            key:
                                                                tag
                                                        },
                                                        tag
                                                    )
                                            )
                                        )
                                    )
                                )
                        )
                    )
                )
            ),


            /* =================================
               ABOUT
            ================================= */

            React.createElement(
                "section",
                {
                    id: "about",
                    className: "section"
                },

                React.createElement(
                    "div",
                    {
                        className:
                            "container"
                    },

                    React.createElement(
                        "div",
                        {
                            className:
                                "about-grid"
                        },

                        React.createElement(
                            "div",
                            {
                                className:
                                    "reveal"
                            },

                            React.createElement(
                                "div",
                                {
                                    className:
                                        "eyebrow"
                                },
                                "Our approach"
                            ),

                            React.createElement(
                                "h2",
                                null,
                                "Simple technology. Thoughtful execution."
                            ),

                            React.createElement(
                                "p",
                                {
                                    style: {
                                        color:
                                            "var(--muted)",
                                        lineHeight:
                                            1.8,
                                        marginTop:
                                            17
                                    }
                                },

                                "The goal is not to add effects everywhere. It is to use design and engineering together so every interaction has a purpose."
                            )
                        ),


                        React.createElement(
                            "div",
                            {
                                className:
                                    "about-panel reveal delay-2"
                            },

                            React.createElement(
                                "div",
                                {
                                    className:
                                        "about-list"
                                },

                                [
                                    [
                                        "check",
                                        "Mobile-first thinking",
                                        "Start with the smallest screen and progressively enhance the experience."
                                    ],

                                    [
                                        "check",
                                        "Consistent components",
                                        "Reusable UI patterns reduce visual inconsistency and make future changes easier."
                                    ],

                                    [
                                        "check",
                                        "Validated interactions",
                                        "Client-side validation gives users immediate, helpful feedback."
                                    ],

                                    [
                                        "check",
                                        "Professional polish",
                                        "Motion, states, spacing and typography are refined to create a credible product feel."
                                    ]
                                ].map(
                                    item =>
                                        React.createElement(
                                            "div",
                                            {
                                                className:
                                                    "about-item",
                                                key:
                                                    item[1]
                                            },

                                            React.createElement(
                                                "div",
                                                {
                                                    className:
                                                        "check"
                                                },

                                                React.createElement(
                                                    Icon,
                                                    {
                                                        name:
                                                            item[0],
                                                        size: 16
                                                    }
                                                )
                                            ),

                                            React.createElement(
                                                "div",
                                                null,

                                                React.createElement(
                                                    "strong",
                                                    null,
                                                    item[1]
                                                ),

                                                React.createElement(
                                                    "p",
                                                    null,
                                                    item[2]
                                                )
                                            )
                                        )
                                )
                            )
                        )
                    ),


                    /* PROCESS */

                    React.createElement(
                        "div",
                        {
                            className:
                                "process"
                        },

                        [
                            "Discover",
                            "Structure",
                            "Design",
                            "Refine"
                        ].map(
                            (
                                step,
                                index
                            ) =>
                                React.createElement(
                                    "div",
                                    {
                                        className:
                                            "process-step reveal",
                                        key:
                                            step
                                    },

                                    React.createElement(
                                        "span",
                                        {
                                            className:
                                                "step-number"
                                        },

                                        `0${
                                            index + 1
                                        }`
                                    ),

                                    React.createElement(
                                        "h4",
                                        null,
                                        step
                                    ),

                                    React.createElement(
                                        "p",
                                        null,

                                        [
                                            "Understand goals, users and content.",

                                            "Build clear sections and reusable patterns.",

                                            "Create visual hierarchy and responsive states.",

                                            "Test interactions, accessibility and polish."
                                        ][index]
                                    )
                                )
                        )
                    )
                )
            ),


            /* =================================
               TESTIMONIALS
            ================================= */

            React.createElement(
                "section",
                {
                    className:
                        "section"
                },

                React.createElement(
                    "div",
                    {
                        className:
                            "container"
                    },

                    React.createElement(
                        "div",
                        {
                            className:
                                "section-head reveal"
                        },

                        React.createElement(
                            "div",
                            {
                                className:
                                    "eyebrow"
                            },
                            "Client perspective"
                        ),

                        React.createElement(
                            "h2",
                            null,
                            "Designed to leave a lasting impression."
                        ),

                        React.createElement(
                            "p",
                            null,
                            "A professional frontend should make the product easier to understand, easier to use and easier to trust."
                        )
                    ),


                    React.createElement(
                        "div",
                        {
                            className:
                                "testimonials"
                        },

                        [
                            [
                                "AM",
                                "Ayesha Malik",
                                "Product Lead",
                                "The interface feels premium without becoming difficult to use. The responsive behavior is excellent."
                            ],

                            [
                                "HR",
                                "Hamza Raza",
                                "Founder",
                                "The micro-interactions are subtle but make the whole product feel much more polished."
                            ],

                            [
                                "SK",
                                "Sara Khan",
                                "Marketing Manager",
                                "Clear structure, strong visual hierarchy and a contact flow that feels effortless."
                            ]
                        ].map(
                            (
                                person,
                                index
                            ) =>
                                React.createElement(
                                    "article",
                                    {
                                        className:
                                            `quote-card reveal delay-${
                                                index + 1
                                            }`,
                                        key:
                                            person[1]
                                    },

                                    React.createElement(
                                        "div",
                                        {
                                            className:
                                                "stars"
                                        },
                                        "★★★★★"
                                    ),

                                    React.createElement(
                                        "blockquote",
                                        null,
                                        `“${person[3]}”`
                                    ),

                                    React.createElement(
                                        "div",
                                        {
                                            className:
                                                "person"
                                        },

                                        React.createElement(
                                            "div",
                                            {
                                                className:
                                                    "avatar"
                                            },
                                            person[0]
                                        ),

                                        React.createElement(
                                            "div",
                                            null,

                                            React.createElement(
                                                "strong",
                                                null,
                                                person[1]
                                            ),

                                            React.createElement(
                                                "small",
                                                null,
                                                person[2]
                                            )
                                        )
                                    )
                                )
                        )
                    )
                )
            ),


            /* =================================
               CONTACT
            ================================= */

            React.createElement(
                "section",
                {
                    id: "contact",
                    className:
                        "section"
                },

                React.createElement(
                    "div",
                    {
                        className:
                            "container"
                    },

                    React.createElement(
                        "div",
                        {
                            className:
                                "section-head reveal"
                        },

                        React.createElement(
                            "div",
                            {
                                className:
                                    "eyebrow"
                            },
                            "Start something great"
                        ),

                        React.createElement(
                            "h2",
                            null,
                            "Have an idea? Let's shape it into an experience."
                        ),

                        React.createElement(
                            "p",
                            null,
                            "Use the form to test the complete client-side validation flow. No backend is required for this demo."
                        )
                    ),


                    React.createElement(
                        "div",
                        {
                            className:
                                "contact-wrap"
                        },


                        /* CONTACT INFORMATION */

                        React.createElement(
                            "aside",
                            {
                                className:
                                    "contact-card reveal"
                            },

                            React.createElement(
                                "h3",
                                null,
                                "Let's connect"
                            ),

                            React.createElement(
                                "p",
                                null,
                                "Whether you need a landing page, dashboard, portfolio or product interface, start with a clear conversation about the goal."
                            ),

                            React.createElement(
                                "div",
                                {
                                    className:
                                        "contact-points"
                                },

                                [
                                    [
                                        "mail",
                                        "Email",
                                        "hello@nexora.dev"
                                    ],

                                    [
                                        "phone",
                                        "Phone",
                                        "+92 300 1234567"
                                    ],

                                    [
                                        "globe",
                                        "Availability",
                                        "Remote / Worldwide"
                                    ]
                                ].map(
                                    item =>
                                        React.createElement(
                                            "div",
                                            {
                                                className:
                                                    "contact-point",
                                                key:
                                                    item[1]
                                            },

                                            React.createElement(
                                                "div",
                                                {
                                                    className:
                                                        "service-icon"
                                                },

                                                React.createElement(
                                                    Icon,
                                                    {
                                                        name:
                                                            item[0],
                                                        size: 18
                                                    }
                                                )
                                            ),

                                            React.createElement(
                                                "div",
                                                null,

                                                React.createElement(
                                                    "strong",
                                                    null,
                                                    item[1]
                                                ),

                                                React.createElement(
                                                    "span",
                                                    null,
                                                    item[2]
                                                )
                                            )
                                        )
                                )
                            )
                        ),


                        /* CONTACT FORM */

                        React.createElement(
                            "form",
                            {
                                className:
                                    "form-card reveal delay-2",

                                onSubmit:
                                    submitForm,

                                noValidate: true
                            },

                            React.createElement(
                                "div",
                                {
                                    className:
                                        "form-grid"
                                },


                                /* NAME */

                                React.createElement(
                                    "div",
                                    {
                                        className:
                                            "field"
                                    },

                                    React.createElement(
                                        "label",
                                        {
                                            htmlFor:
                                                "name"
                                        },
                                        "Your name"
                                    ),

                                    React.createElement(
                                        "input",
                                        {
                                            id:
                                                "name",

                                            type:
                                                "text",

                                            placeholder:
                                                "e.g. Muhammad Siddique",

                                            value:
                                                form.name,

                                            onChange:
                                                event =>
                                                    setForm({
                                                        ...form,
                                                        name:
                                                            event
                                                                .target
                                                                .value
                                                    })
                                        }
                                    ),

                                    React.createElement(
                                        "span",
                                        {
                                            className:
                                                "error"
                                        },
                                        errors.name ||
                                            ""
                                    )
                                ),


                                /* EMAIL */

                                React.createElement(
                                    "div",
                                    {
                                        className:
                                            "field"
                                    },

                                    React.createElement(
                                        "label",
                                        {
                                            htmlFor:
                                                "email"
                                        },
                                        "Email address"
                                    ),

                                    React.createElement(
                                        "input",
                                        {
                                            id:
                                                "email",

                                            type:
                                                "email",

                                            placeholder:
                                                "you@example.com",

                                            value:
                                                form.email,

                                            onChange:
                                                event =>
                                                    setForm({
                                                        ...form,
                                                        email:
                                                            event
                                                                .target
                                                                .value
                                                    })
                                        }
                                    ),

                                    React.createElement(
                                        "span",
                                        {
                                            className:
                                                "error"
                                        },
                                        errors.email ||
                                            ""
                                    )
                                ),


                                /* SUBJECT */

                                React.createElement(
                                    "div",
                                    {
                                        className:
                                            "field full"
                                    },

                                    React.createElement(
                                        "label",
                                        {
                                            htmlFor:
                                                "subject"
                                        },
                                        "Subject"
                                    ),

                                    React.createElement(
                                        "input",
                                        {
                                            id:
                                                "subject",

                                            type:
                                                "text",

                                            placeholder:
                                                "Project type or idea",

                                            value:
                                                form.subject,

                                            onChange:
                                                event =>
                                                    setForm({
                                                        ...form,
                                                        subject:
                                                            event
                                                                .target
                                                                .value
                                                    })
                                        }
                                    ),

                                    React.createElement(
                                        "span",
                                        {
                                            className:
                                                "error"
                                        },
                                        errors.subject ||
                                            ""
                                    )
                                ),


                                /* MESSAGE */

                                React.createElement(
                                    "div",
                                    {
                                        className:
                                            "field full"
                                    },

                                    React.createElement(
                                        "label",
                                        {
                                            htmlFor:
                                                "message"
                                        },
                                        "Message"
                                    ),

                                    React.createElement(
                                        "textarea",
                                        {
                                            id:
                                                "message",

                                            placeholder:
                                                "Tell us what you want to build...",

                                            value:
                                                form.message,

                                            onChange:
                                                event =>
                                                    setForm({
                                                        ...form,
                                                        message:
                                                            event
                                                                .target
                                                                .value
                                                    })
                                        }
                                    ),

                                    React.createElement(
                                        "span",
                                        {
                                            className:
                                                "error"
                                        },
                                        errors.message ||
                                            ""
                                    )
                                )
                            ),


                            React.createElement(
                                "div",
                                {
                                    className:
                                        "form-bottom"
                                },

                                React.createElement(
                                    "span",
                                    {
                                        className:
                                            "form-note"
                                    },
                                    "Demo form • client-side validation • no data is sent"
                                ),

                                React.createElement(
                                    "button",
                                    {
                                        className:
                                            "btn btn-primary",
                                        type:
                                            "submit"
                                    },

                                    "Validate & Send",

                                    React.createElement(
                                        Icon,
                                        {
                                            name:
                                                "arrow",
                                            size: 17
                                        }
                                    )
                                )
                            )
                        )
                    )
                )
            )
        ),


        /* =====================================
           FOOTER
        ===================================== */

        React.createElement(
            "footer",
            {
                className:
                    "footer"
            },

            React.createElement(
                "div",
                {
                    className:
                        "container footer-inner"
                },

                React.createElement(
                    "p",
                    null,
                    "© 2026 Nexora. Crafted with HTML, CSS, JavaScript & React."
                ),

                React.createElement(
                    "div",
                    {
                        className:
                            "footer-links"
                    },

                    React.createElement(
                        "a",
                        {
                            href: "#home"
                        },
                        "Home"
                    ),

                    React.createElement(
                        "a",
                        {
                            href: "#work"
                        },
                        "Work"
                    ),

                    React.createElement(
                        "a",
                        {
                            href: "#contact"
                        },
                        "Contact"
                    )
                )
            )
        ),


        /* =====================================
           BACK TO TOP
        ===================================== */

        React.createElement(
            "button",
            {
                className:
                    "back-top",

                "aria-label":
                    "Back to top",

                onClick: () =>
                    scrollTo("#home")
            },

            React.createElement(
                Icon,
                {
                    name: "arrow",
                    size: 18
                }
            )
        ),


        /* =====================================
           TOAST
        ===================================== */

        React.createElement(
            "div",
            {
                className:
                    `toast ${
                        toast
                            ? "show"
                            : ""
                    }`
            },

            React.createElement(
                "span",
                {
                    className:
                        "toast-dot"
                }
            ),

            toast
        ),


        /* =====================================
           PROJECT MODAL
        ===================================== */

        React.createElement(
            "div",
            {
                className:
                    `modal-backdrop ${
                        selectedProject
                            ? "open"
                            : ""
                    }`,

                onMouseDown: event => {

                    if (
                        event.target ===
                        event.currentTarget
                    ) {
                        setSelectedProject(
                            null
                        );
                    }
                }
            },

            selectedProject &&
                React.createElement(
                    "div",
                    {
                        className:
                            "modal",

                        role:
                            "dialog",

                        "aria-modal":
                            "true"
                    },

                    React.createElement(
                        "div",
                        {
                            className:
                                "modal-head"
                        },

                        React.createElement(
                            "div",
                            null,

                            React.createElement(
                                "div",
                                {
                                    className:
                                        "eyebrow"
                                },
                                selectedProject.category
                            ),

                            React.createElement(
                                "h3",
                                null,
                                selectedProject.title
                            )
                        ),

                        React.createElement(
                            "button",
                            {
                                className:
                                    "close-modal",

                                "aria-label":
                                    "Close",

                                onClick:
                                    () =>
                                        setSelectedProject(
                                            null
                                        )
                            },

                            React.createElement(
                                Icon,
                                {
                                    name:
                                        "close",
                                    size: 22
                                }
                            )
                        )
                    ),

                    React.createElement(
                        "p",
                        null,
                        selectedProject.description
                    ),

                    React.createElement(
                        "ul",
                        {
                            className:
                                "modal-list"
                        },

                        selectedProject.features.map(
                            feature =>
                                React.createElement(
                                    "li",
                                    {
                                        key:
                                            feature
                                    },
                                    feature
                                )
                        )
                    ),

                    React.createElement(
                        "button",
                        {
                            className:
                                "btn btn-primary",

                            onClick: () => {

                                setSelectedProject(
                                    null
                                );

                                scrollTo(
                                    "#contact"
                                );
                            }
                        },

                        "Discuss a similar project",

                        React.createElement(
                            Icon,
                            {
                                name:
                                    "arrow",
                                size: 17
                            }
                        )
                    )
                )
        )
    );
}


/* =========================================
   START REACT APPLICATION
========================================= */

ReactDOM
    .createRoot(
        document.getElementById(
            "app"
        )
    )
    .render(
        React.createElement(
            App
        )
    );