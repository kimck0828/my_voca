import {Link} from "react-router-dom";

export default function Header() {
    return (
        <div className="header">
            <h1>
                <a href="/">TOEIC 英単語暗記</a>
            </h1>
            <div className="menu">
                <Link to="/create_word" className='link'>
                    単語追加
                </Link>
                <Link to="/create_day" className='link'>
                    Day追加
                </Link>
            </div>
            
        </div>

    );
}