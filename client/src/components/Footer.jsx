
import styled from 'styled-components'

const Container = styled.footer`
    width: 100%;
    height: auto;
    text-align: center;
    
    span{
        cursor: pointer;
        font-size: 12px;
        font-weight: 400;
        color: var(--blue-2);
        padding: 0 6px;

        &:last-child{
            color: var(--white);
        }
    }
`

const Footer = () => {
    return (
        <Container>
            <span>Terms</span>
            <span>Privacy</span>
            <span>Contact</span>
            <span>Security</span>
            <span>&copy; Notee</span>
        </Container>
    )
}
export default Footer