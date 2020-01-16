import styled from "styled-components";

export const Article = styled.article`
font-family: sans-serif;
color: #333;
width: 75%;
min-width: 240px;
max-width: 715px;
padding: 24px 0;
border-top: 1px solid #e1e4e8;
`;

export const Header = styled.header`
color: #0366d6;
font-size: 16px;
font-weight: 400;
`;

export const Title = styled.h2`
font-size: 20px;
line-height: 1.5;
margin: 0;
& >  a {
color: #0366d6;

&:hover {
text-decoration: underline;
}
}
`;

export const Details = styled.div`
font-size: 14px;
line-height: 24px;
display: flex;
`;

export const StarLink = styled.a`
color: #586069;
display: flex;
align-items: center;
transition: color .3s; 
& > svg {
transition: color .3s; 
margin-right: 5px;
}

&:hover{
color: #0366d6;

& > svg {
fill: #0366d6;
}
}
`;
