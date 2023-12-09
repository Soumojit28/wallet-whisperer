import { GraphQLClient, gql } from 'graphql-request';

const endpoint = process.env.SUBGRAPH_URL as string

const client = new GraphQLClient(endpoint);

const discordIdQuery = gql`
  query MyQuery($id: String!) {
    discordId(id: $id) {
      id
      tokenId
      walletAddress
      discordId
    }
  }
`;

const walletAddressQuery = gql`
  query MyQuery($walletAddress: String!) {
    discordIds(where: { walletAddress: $walletAddress }) {
      id
      discordId
      tokenId
      walletAddress
    }
  }
`;

const findByDiscordId = async(discordId: string) => {
    try {
        const variables = { id: discordId };
        const response = await client.request(discordIdQuery, variables);
        // console.log("subgraph",response);
        return response;
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
}

const findByWalletAddress = async (walletAddress: string) => {
    try {
        const variables = { walletAddress: walletAddress };
        const response = await client.request(walletAddressQuery, variables);
        console.log("subgraph",response);
        return response;
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
}


export {findByDiscordId, findByWalletAddress}