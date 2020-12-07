import { Header, Icon } from "semantic-ui-react";

export default () => {
  return (
    <Header as="h2" icon textAlign="center">
      <Icon name="users" circular />
      <Header.Content>Friends List</Header.Content>
    </Header>
  );
};
