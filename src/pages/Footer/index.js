import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { NavbarContext } from 'src/Setup/Contexts/NavbarContext';
import MailtoButton from 'src/Setup/Util/MailtoButton';

export default function Footer() {

    var contextNavbar = useContext(NavbarContext);

    const navbarType = contextNavbar.navbar;

    return (
        <>
            {
                contextNavbar.navbar &&

                <div className='footer'>
                    <div>
                        <ul>
                            <li>
                                <Link to="/privacypolicy"> Privacy Policy </Link>
                            </li>
                            <li>
                                <Link to="/cookiespolicy"> Cookies Policy </Link>
                            </li>
                            <li>
                                <MailtoButton label="admin@medborgerskabsprove.dk" mailto="mailto:admin@medborgerskabsprove.dk" />
                            </li>
                        </ul>
                    </div>

                </div>
            }
        </>
    );
}
