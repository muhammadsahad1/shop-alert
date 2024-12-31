import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const NewProductsUpdatesBtn = ({ subscribeToNewProducts, unsubscribeFromNewProducts, isSubscribed }) => {
    const [subscribed, setSubscribed] = useState(isSubscribed);

    useEffect(() => {

        setSubscribed(isSubscribed);
    }, [isSubscribed]);

    const handleSubscription = () => {
        try {
            if (subscribed) {
                unsubscribeFromNewProducts();
                setSubscribed(false);
                toast.success('You have unsubscribed from new product updates.');
            } else {
                subscribeToNewProducts();
                setSubscribed(true);
                toast.success('You have subscribed to new product updates!');
            }
        } catch (error) {
            toast.error('Something went wrong. Please try again.');
        }
    };

    return (
        <button
            onClick={handleSubscription}
            className={` px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${subscribed
                ? 'bg-red-500 text-white hover:bg-red-600'
                : 'bg-blue-500 text-white hover:bg-blue-600'
                }`}
        >
            {subscribed ? 'Unsubscribe' : 'Subscribe for Updates'}
        </button>
    );
};

export default NewProductsUpdatesBtn;
