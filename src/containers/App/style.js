/**
 *
 * TomoWallet - Application Container - Style
 *
 */
// ===== IMPORTS =====
// Modules
import styled from 'styled-components';
import { Container } from 'reactstrap';
// ===================

// ===== STYLE =====
const AppStyler = styled(Container)`
    background: ${props => props.theme.background};
`;
// =================

export default AppStyler;
