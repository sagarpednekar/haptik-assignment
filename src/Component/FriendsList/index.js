import PropTypes from "prop-types";
import { Button, List } from "semantic-ui-react";

const FriendsList = ({
  displayUsers,
  enableSearch,
  deleteUser,
  toggleFavorite,
}) => {
  return (
    <List divided verticalAlign="middle">
      {displayUsers?.length && !enableSearch ? (
        <>
          {displayUsers.map((user, index) => {
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
        </>
      ) : (
        !enableSearch && <div>Try adding new Friend :)</div>
      )}
    </List>
  );
};

FriendsList.propTypes = {
  displayUsers: PropTypes.array.isRequired,
  deleteUser: PropTypes.func.isRequired,
  toggleFavorite: PropTypes.func.isRequired,
  enableSearch: PropTypes.bool.isRequired,
};

export default FriendsList;
