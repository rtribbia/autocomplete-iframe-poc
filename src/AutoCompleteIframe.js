import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { iframeCSS } from './iframeCSS';


// Requires Website Restriction of "about:blank"
const API_KEY = 'INSERT_API_KEY_HERE'

const AutoCompleteIframe = ({ children, formRef }) => {
    const [iframeRef, setIframeRef] = useState(null)
    const iframeMountNode = iframeRef?.contentWindow?.document?.body;


    useEffect(() => {
        if (!formRef || !iframeMountNode) {
            return
        }

        initializeAutocomplete(iframeRef)
            .catch((error) => {
                alert("Gmaps init error:", error.message)
            })
    }, [formRef, iframeRef, iframeMountNode]);



    return (
        <iframe
            ref={setIframeRef}
            className="autocomplete-iframe"
            title="autocomplete-iframe"
        >
            {iframeMountNode && createPortal(children, iframeMountNode)}
        </iframe>
    );
}

function initializeAutocomplete(iframeRef) {
    const iframe = iframeRef.contentWindow;

    return new Promise((resolve, reject) => {
        if (iframe.google) {
            resolve();
            return;
        }

        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places&callback=initAutocomplete`

        iframe.gm_authFailure = () => { alert("Gmaps auth failure") }

        iframe.initAutocomplete = () => {
            try {
                const address1Field = iframe.document.querySelector("#ship-address");

                if (!address1Field) {
                    reject('Nothing to attach autocomplete widget to.');
                    return;
                }

                const autocomplete = new iframe.google.maps.places.Autocomplete(
                    address1Field,
                    {
                        fields: ['address_components', 'types'],
                        types: ['street_address', 'premise', 'subpremise'],
                    },
                );

                autocomplete.addListener('place_changed', () => fillInAddress(iframe, autocomplete))

                resolve();

            } catch (error) {
                reject(error);
            }
        };


        iframe.document.head.appendChild(script);

        const css = document.createElement('style');
        css.innerText = iframeCSS


        iframe.document.head.appendChild(css);
    });
}



// https://developers.google.com/maps/documentation/javascript/examples/places-autocomplete-addressform#maps_places_autocomplete_addressform-javascript
function fillInAddress(iframeWindow, autocomplete) {
    
    // Get the place details from the autocomplete object.
    const place = autocomplete.getPlace()
    
    const address1Field = iframeWindow.document.querySelector("#ship-address");
    const address2Field = iframeWindow.document.querySelector("#address2");
    const postalField = iframeWindow.document.querySelector("#postcode");


    console.log({address1Field, address2Field, postalField})


    let address1 = "";
    let postcode = "";

    console.log(place)

    // Get each component of the address from the place details,
    // and then fill-in the corresponding field on the form.
    // place.address_components are google.maps.GeocoderAddressComponent objects
    // which are documented at http://goo.gle/3l5i5Mr
    for (const component of place.address_components) {
        // @ts-ignore remove once typings fixed
        const componentType = component.types[0];

        switch (componentType) {
            case "street_number": {
                address1 = `${component.long_name} ${address1}`;
                break;
            }

            case "route": {
                address1 += component.short_name;
                break;
            }

            case "postal_code": {
                postcode = `${component.long_name}${postcode}`;
                break;
            }

            case "postal_code_suffix": {
                postcode = `${postcode}-${component.long_name}`;
                break;
            }
            case "locality":
                iframeWindow.document.querySelector("#locality").value = component.long_name;
                break;
            case "administrative_area_level_1": {
                iframeWindow.document.querySelector("#state").value = component.short_name;
                break;
            }
            case "country":
                iframeWindow.document.querySelector("#country").value = component.long_name;
                break;
        }
    }

    address1Field.value = address1;
    postalField.value = postcode;
    // After filling the form with address components from the Autocomplete
    // prediction, set cursor focus on the second address line to encourage
    // entry of subpremise information such as apartment, unit, or floor number.
    address2Field.focus();
}




export default AutoCompleteIframe