import styled from 'styled-components'

export const Navigation = styled.nav`
margin: 18px auto;
`;

export const Menu = styled.ul`
display: flex;
justify-content: center;
align-items: center;
width: 100%;
`;

export const MenuItem = styled.li`
box-sizing: border-box;
border: 1px solid rgba(151, 151, 151, 0.56);
border-radius: 0;
color: #4a90e2;
width: 38px;
height: 25px;
font-size: 13px;
display: flex;
justify-content: center;
align-items: center;
margin-right: 5px;
padding: 0 5px;
    
&:first-child{
margin-left: 5px;
}
    
&.active {
background: #586069;
color: #ffffff;
}
    
&:not(.disabled):hover {
cursor: pointer;
}
`;
export const NavigationBtn = styled(MenuItem)`
border: none;

&.disabled {
background: #ffffff;
color: #ffffff;
}
`;
