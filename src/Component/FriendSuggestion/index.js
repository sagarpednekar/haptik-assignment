import PropTypes from "prop-types";
import { Button, List } from "semantic-ui-react";

const FriendSuggestionList = ({
  toggleFavorite,
  enableSearch,
  friendList,
  deleteUser,
}) => {
  return (
    <List divided verticalAlign="middle">
      {enableSearch &&
        friendList.map((user, index) => {
          return (
            <List.Item key={index}>
              <List.Content floated="right">
                <Button
                  onClick={() => {
                    deleteUser(user.name);
                  }}
                  icon="trash"
                />
                <Button
                  color={user.favorite ? "yellow" : "grey"}
                  onClick={() => {
                    toggleFavorite(user);
                  }}
                  icon="star"
                />
              </List.Content>
              <List.Content>
                <List.Header>{user.name}</List.Header>
                <List.Description>is your friend</List.Description>
              </List.Content>
            </List.Item>
          );
        })}
    </List>
  );
};

FriendSuggestionList.propTypes = {
  toggleFavorite: PropTypes.func.isRequired,
  enableSearch: PropTypes.bool.isRequired,
  friendList: PropTypes.array.isRequired,
  deleteUser: PropTypes.func.isRequired,
};
export default FriendSuggestionList;
