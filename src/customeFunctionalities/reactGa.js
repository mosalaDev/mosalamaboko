import ReactGa from 'react-ga';

export const gaEvent = (category, action, label) => {
    console.log("Event: ", category, "; Action: ", action, "; Label: ", label)
    ReactGa.event({
        category,
        action,
        label
    })
};