import React from 'react'
import Icon from "../../icon";
import {Text} from "../TextComponents/TextComponents";
import {Article, Header, Title, Details, StarLink} from './style'

const RepositoryCard = ({repoDetails}) => {
    return <Article>
        <Header>
            <Title>
                <a href={repoDetails['html_url']}
                   target='_blank'
                   rel="noopener noreferrer"
                   title="View more"
                >
                    {repoDetails.name}
                </a>
            </Title>
        </Header>
        <section>
            <Text>
                {repoDetails.description}
            </Text>
            <Details>
                <StarLink href={repoDetails['stargazers_url']}
                          target='_blank'
                          rel="noopener noreferrer"
                          title='View fork details'
                >
                    <Icon name="star"/>
                    {repoDetails['stargazers_count']}
                </StarLink>
            </Details>
        </section>
    </Article>
};

export default RepositoryCard;
