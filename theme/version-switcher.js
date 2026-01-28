(function() {
    'use strict';

    // Version configuration - add new versions here
    var versions = [
        'v1',
        'v2',
        'v3',
    ];
    var defaultVersion = 'v3';
    var versionLabels = {
        'v1': 'v1',
        'v2': 'v2',
        'v3': 'v3 (latest)',
    };

    // Get current version from path or default
    function getCurrentVersion() {
        var path = window.location.pathname;

        // Check each configured version
        for (var i = 0; i < versions.length; i++) {
            if (path.includes('/' + versions[i] + '/')) {
                return versions[i];
            }
        }

        return defaultVersion;
    }

    // Get version base URL
    function getVersionUrl(version) {
        var protocol = window.location.protocol;
        var host = window.location.host;
        var pathname = window.location.pathname;

        var isLocal = host.includes('localhost') || host.includes('127.0.0.1') || protocol === 'file:';

        if (isLocal) {
            // Replace any version in path with target version
            var newPath = pathname;
            var currentVer = getCurrentVersion();
            newPath = pathname.replace('/' + currentVer + '/', '/' + version + '/');
            return protocol + '//' + host + newPath.substring(0, newPath.lastIndexOf('/') + 1);
        } else {
            // Production: dynamically detect base path
            // Extract base path (e.g., /dasel-docs/ for GitHub Pages)
            var pathParts = pathname.split('/').filter(function(p) { return p; });
            var basePath = '';

            // Find the repo name (first non-version path segment)
            for (var i = 0; i < pathParts.length; i++) {
                if (pathParts[i] !== 'v1' && pathParts[i] !== 'v2') {
                    basePath = '/' + pathParts[i];
                    break;
                }
            }

            return protocol + '//' + host + basePath + '/' + version + '/';
        }
    }

    // Create version switcher UI
    function createVersionSwitcher() {
        var currentVersion = getCurrentVersion();

        var container = document.createElement('div');
        container.className = 'version-switcher';

        // Create button
        var button = document.createElement('button');
        button.className = 'icon-button version-switcher-button';
        button.setAttribute('type', 'button');
        button.setAttribute('title', 'Switch Version');
        button.setAttribute('aria-label', 'Switch Version');
        button.setAttribute('aria-haspopup', 'true');
        button.setAttribute('aria-expanded', 'false');

        var iconSpan = document.createElement('span');
        iconSpan.className = 'fa-svg';
        iconSpan.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Free 6.2.0 --><path d="M80 104c13.3 0 24-10.7 24-24s-10.7-24-24-24S56 66.7 56 80s10.7 24 24 24zm80-24c0 32.8-19.7 61-48 73.3V192c0 17.7 14.3 32 32 32H304c17.7 0 32-14.3 32-32V153.3C307.7 141 288 112.8 288 80c0-44.2 35.8-80 80-80s80 35.8 80 80c0 32.8-19.7 61-48 73.3V192c0 53-43 96-96 96H256v70.7c28.3 12.3 48 40.5 48 73.3c0 44.2-35.8 80-80 80s-80-35.8-80-80c0-32.8 19.7-61 48-73.3V288H144c-53 0-96-43-96-96V153.3C19.7 141 0 112.8 0 80C0 35.8 35.8 0 80 0s80 35.8 80 80zm208 24c13.3 0 24-10.7 24-24s-10.7-24-24-24s-24 10.7-24 24s10.7 24 24 24zM248 432c0-13.3-10.7-24-24-24s-24 10.7-24 24s10.7 24 24 24s24-10.7 24-24z"/></svg>';
        button.appendChild(iconSpan);

        // Create dropdown menu
        var menu = document.createElement('div');
        menu.className = 'version-menu';
        menu.setAttribute('role', 'menu');

        // Add version options (reverse order to show latest first)
        for (var i = versions.length - 1; i >= 0; i--) {
            var ver = versions[i];
            var item = document.createElement('button');
            item.className = 'version-menu-item';
            item.setAttribute('type', 'button');
            item.setAttribute('role', 'menuitem');
            item.textContent = versionLabels[ver] || ver;
            item.dataset.version = ver;

            if (ver === currentVersion) {
                item.classList.add('active');
            }

            // Add click handler
            (function(version) {
                item.addEventListener('click', function() {
                    var currentPath = window.location.pathname;
                    var pathParts = currentPath.split('/');
                    var pagePath = pathParts[pathParts.length - 1] || 'index.html';

                    var newUrl = getVersionUrl(version);
                    newUrl += pagePath;

                    window.location.href = newUrl;
                });
            })(ver);

            menu.appendChild(item);
        }

        // Toggle menu on button click
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            var isExpanded = menu.classList.contains('show');
            menu.classList.toggle('show');
            button.setAttribute('aria-expanded', !isExpanded);
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!container.contains(e.target)) {
                menu.classList.remove('show');
                button.setAttribute('aria-expanded', 'false');
            }
        });

        container.appendChild(button);
        container.appendChild(menu);

        return container;
    }

    // Initialize version switcher
    function initVersionSwitcher() {
        var rightButtons = document.querySelector('.right-buttons');
        if (!rightButtons) {
            console.warn('Version switcher: Could not find .right-buttons element');
            return;
        }

        var switcher = createVersionSwitcher();

        // Insert before first child (before print button)
        rightButtons.insertBefore(switcher, rightButtons.firstChild);
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initVersionSwitcher);
    } else {
        initVersionSwitcher();
    }
})();
