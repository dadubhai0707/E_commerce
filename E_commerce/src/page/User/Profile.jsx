import { useSelector } from "react-redux";
const user_profile = () => {
    const IsUser = useSelector((state) => state.auth.IsUser);
    const user = {
        name: 'John Doe',
        username: 'john_doe',
        bio: 'Avid reader and tech enthusiast.',
        profilePicture: 'path-to-profile-picture.jpg',
        wishlist: ['Product 1', 'Product 2', 'Product 3'],
        reviews: [
            { product: 'Product 1', review: 'Great product!' },
            { product: 'Product 2', review: 'Not bad.' },
        ],
    };

    return (
        <div className="profile-container">
            <div className="profile-header">
                <img src={user.profilePicture} alt={`${IsUser.Uname}'s profile`} className="profile-picture" />
                <div className="profile-info">
                    <h1 className="profile-name">{IsUser.Uname} {IsUser.Ulname} </h1>
                    <p className="profile-username">@{IsUser.Uname}</p>
                    <p className="profile-bio">{user.bio}</p>
                </div>
            </div>
            <div className="profile-section">
                <h2>Wishlist</h2>
                <ul className="wishlist">
                    {user.wishlist.map((item, index) => (
                        <li key={index} className="wishlist-item">{item}</li>
                    ))}
                </ul>
            </div>
            <div className="profile-section">
                <h2>Reviews</h2>
                <ul className="reviews">
                    {user.reviews.map((review, index) => (
                        <li key={index} className="review-item">
                            <strong>{review.product}:</strong> {review.review}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default user_profile;
