document.addEventListener('DOMContentLoaded', function() {
    const elements = {
        tooltip: document.querySelectorAll('.tooltipped'),
        sideNav: document.querySelectorAll('.sidenav'),
        fixedActionButton: document.querySelector('.fixed-action-btn')
    }

    M.Tooltip.init(elements.tooltip);
    M.Sidenav.getInstance(elements.sideNav);
    M.FloatingActionButton.init(elements.fixedActionButton);
});