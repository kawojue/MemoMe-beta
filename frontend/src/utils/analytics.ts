import ReactGA from "react-ga";

export const initGA = () => {
    ReactGA.initialize("G-G5V9QPP7DJ")
};

export const logPageView = () => {
    ReactGA.set({ page: window.location.pathname })
    ReactGA.pageview(window.location.pathname)
};