import ReactGA from "react-ga";

export const initGA = () => {
    ReactGA.initialize("G-HCS1WMP0E9")
}

export const logPageView = () => {
    ReactGA.pageview(window.location.pathname)
    ReactGA.set({ page: window.location.pathname })
}