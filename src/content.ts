((): void => {
    const HIDE_SHORTS_ROUTE = true;

    const SHORTS_CARD_SELECTOR =
        "ytd-rich-item-renderer, ytd-grid-video-renderer, ytd-video-renderer, ytd-compact-video-renderer, ytd-reel-item-renderer, ytd-guide-entry-renderer, ytd-mini-guide-entry-renderer";

    function isShortsPath(pathname: string): boolean {
        return pathname.startsWith("/shorts");
    }

    function removeShortsAnchors(root: ParentNode = document): void {
        const anchors = root.querySelectorAll<HTMLAnchorElement>('a[href*="/shorts/"]');

        for (const anchor of anchors) {
            const card = anchor.closest(SHORTS_CARD_SELECTOR);
            if (card) {
                card.remove();
            } else {
                anchor.remove();
            }
        }

        const shortsTabs = root.querySelectorAll<HTMLElement>(
            'a[title="Shorts"], #endpoint[title="Shorts"], ytd-guide-entry-renderer a[href="/shorts"], ytd-mini-guide-entry-renderer a[href="/shorts"]'
        );

        for (const tab of shortsTabs) {
            const container = tab.closest("ytd-guide-entry-renderer, ytd-mini-guide-entry-renderer") ?? tab;
            container.remove();
        }
    }

    function removeShortsShelves(root: ParentNode = document): void {
        const shelves = root.querySelectorAll<HTMLElement>(
            "ytd-rich-shelf-renderer[is-shorts], ytd-reel-shelf-renderer, ytd-reel-video-renderer"
        );

        for (const shelf of shelves) {
            shelf.remove();
        }
    }

    function sanitizePage(root: ParentNode = document): void {
        removeShortsShelves(root);
        removeShortsAnchors(root);
    }

    function redirectIfOnShorts(): void {
        if (!HIDE_SHORTS_ROUTE) {
            return;
        }

        if (isShortsPath(location.pathname)) {
            location.replace("https://www.youtube.com/");
        }
    }

    redirectIfOnShorts();
    sanitizePage(document);

    window.addEventListener("yt-navigate-finish", () => {
        redirectIfOnShorts();
        sanitizePage(document);
    });

    const observer = new MutationObserver((mutations: MutationRecord[]) => {
        for (const mutation of mutations) {
            for (const node of mutation.addedNodes) {
                if (node instanceof Element) {
                    sanitizePage(node);
                }
            }
        }
    });

    observer.observe(document.documentElement, {
        childList: true,
        subtree: true,
    });
})();
