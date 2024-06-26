import ReactGA from 'react-ga4';

const measurementId = 'G-374LE8WP35'
ReactGA.initialize(measurementId);

export const trackPageView = (page) => {
    ReactGA.send({ hitType: 'pageview', page });
};

export const trackEvent = (category, action, label = '') => {
    ReactGA.event({
        category,
        action,
        label
    });
};