import { useAuthContext } from 'features/Auth/components/AuthenticationProvider';
import SearchForm from 'features/Search/components/SearchForm';
import React from 'react';
import { Link } from 'react-router-dom';
import {
    Button,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Nav,
    Navbar,
    NavbarBrand,
    UncontrolledDropdown,
} from 'reactstrap';

import firebase from 'firebase';
import './Header.scss';

function Header() {
    const { user, logout } = useAuthContext();

    const handleLogoutClick = async () => {
        await firebase.auth().signOut();
        logout();
    };

    return (
        <header className='header'>
            <Navbar expand='md' className='navbar' dark>
                <NavbarBrand tag={Link} to='/'>
                    DaBezt Movie
                </NavbarBrand>
                <SearchForm />
                <Nav className='ml-auto' navbar>
                    {user ? (
                        <UncontrolledDropdown>
                            <DropdownToggle caret color='info'>
                                <span>{user.displayName}</span>
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem tag={Link} to='/wishlist'>
                                    WishList
                                </DropdownItem>
                                <DropdownItem tag={Link} to='/watched'>
                                    Watched
                                </DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem onClick={handleLogoutClick}>Logout</DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    ) : (
                        <Button tag={Link} color='danger' to='/sign-in'>
                            Sign In
                        </Button>
                    )}
                </Nav>
            </Navbar>
        </header>
    );
}

export default Header;
