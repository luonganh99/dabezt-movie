import { faFilm, faListUl, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import blankAvatar from 'assets/imgs/blank-avatar.png';
import SearchForm from 'features/Search/components/SearchForm';
import firebase from 'firebase';
import { useAuth } from 'hooks/useAuth';
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
import './Header.scss';

function Header() {
    const { user, logout } = useAuth();

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
                            <DropdownToggle nav caret color='info'>
                                <img
                                    className='avatar'
                                    src={user.photoURL ? user.photoURL : blankAvatar}
                                    alt='avatar'
                                />
                                <span>{user.displayName ? user.displayName : user.email}</span>
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem tag={Link} to='/wishlist'>
                                    <FontAwesomeIcon icon={faListUl} className='mr-2' /> WishList
                                </DropdownItem>
                                <DropdownItem tag={Link} to='/watchedlist'>
                                    <FontAwesomeIcon icon={faFilm} className='mr-2' /> Watched
                                </DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem onClick={handleLogoutClick}>
                                    {' '}
                                    <FontAwesomeIcon icon={faSignOutAlt} className='mr-2' /> Logout
                                </DropdownItem>
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
