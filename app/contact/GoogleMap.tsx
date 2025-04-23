import React from 'react';

const GoogleMap = () => {
    return (
        <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1119.2091187256483!2d127.02852575152447!3d37.4937308722061!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca15abd9f2bb1%3A0x61134c02306d3c31!2z7ISc7Jq47Yq567OE7IucIOyEnOy0iOq1rCDshJzstIjrjIDroZw3OOq4uCA0NA!5e0!3m2!1sko!2skr!4v1734586180685!5m2!1sko!2skr" 
            className="w-full h-96 border-0"
            allowFullScreen 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
    );
};

export default GoogleMap; 