import Link from 'next/link';
import { useState } from 'react';
import { Container, Nav, NavDropdown, Navbar } from 'react-bootstrap';
import Image from 'next/image';
import logoImage from '@/assets/images/news_glance_logo.png';

const NavBar = () => {
  const [countryCode, setCountryCode] = useState<string>('ca');
  const handleCountryChange = (countryCode: string) => {
    setCountryCode(countryCode);
  };
  return (
    <Navbar
      bg="dark"
      variant="dark"
      sticky="top"
      expand="sm"
      collapseOnSelect={true}
    >
      <Container>
        <Image
          style={{ marginRight: 10 }}
          src={logoImage}
          alt="Logo image"
          width={48}
          height={48}
        />
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav>
            <Nav.Link as={Link} href="/">
              News
            </Nav.Link>
            <Nav.Link as={Link} href="/search">
              Search
            </Nav.Link>
            {/* Conditionally render "Categories" dropdown based on country code */}
            {countryCode !== 'ua' && (
              <NavDropdown title="Categories" id="categories-dropdown">
                <NavDropdown.Item as={Link} href="/categories/business">
                  Business
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} href="/categories/entertainment">
                  Entertainment
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} href="/categories/general">
                  General
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} href="/categories/health">
                  Health
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} href="/categories/science">
                  Science
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} href="/categories/sports">
                  Sports
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} href="/categories/technology">
                  Technology
                </NavDropdown.Item>
              </NavDropdown>
            )}
            <NavDropdown title="Country" id="country-dropdown">
              <NavDropdown.Item
                as={Link}
                href="/countries/ca"
                onClick={() => handleCountryChange('ca')}
              >
                Canada
              </NavDropdown.Item>
              <NavDropdown.Item
                as={Link}
                href="/countries/ua"
                onClick={() => handleCountryChange('ua')}
              >
                Українa
              </NavDropdown.Item>
              <NavDropdown.Item
                as={Link}
                href="/countries/us"
                onClick={() => handleCountryChange('us')}
              >
                USA
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link as={Link} href="/contact">
              Contact us
            </Nav.Link>
          </Nav>
          <a
            href="https://play.google.com/store/apps/details?id=com.turskyi.news_glance"
            target="_blank"
            style={{ marginLeft: 10 }}
          >
            <Image
              src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
              alt="Get it on Google Play"
              width={124}
              height={48}
            />
          </a>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
