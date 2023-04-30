import ReactGA from "react-ga";

export const initGA = () => {
    ReactGA.initialize("G-G5V9QPP7DJ")
}

export const logPageView = () => {
    ReactGA.pageview(window.location.pathname)
    ReactGA.set({ page: window.location.pathname })
}