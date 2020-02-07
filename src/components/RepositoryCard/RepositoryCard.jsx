import React from 'react'
import Icon from "../../icon";
import {Text} from "../TextComponents/TextComponents";
import {Article, Header, Title, Details, StarLink} from './style'

const RepositoryCard = ({repoDetails: {name, description, html_url, stargazers_url, stargazers_count}}) => {
    return <Article>
        <Header>
            <Title>
                <a href={html_url}
                   target='_blank'
                   rel="noopener noreferrer"
                   title="View more"
                >
                    {name}
                </a>
            </Title>
        </Header>
        <div>
            <Text>
                {description || ' '}
            </Text>
            <Details>
                <StarLink href={stargazers_url}
                          target='_blank'
                          rel="noopener noreferrer"
                          title='View stargazers details'
                >
                    <Icon name="star"/>
                    {stargazers_count}
                </StarLink>
            </Details>
        </div>
    </Article>
};

export default RepositoryCard;
