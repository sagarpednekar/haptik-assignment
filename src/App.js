import { useEffect, useState } from "react";
import {
  Input,
  Button,
  List,
  Container,
  Header,
  Icon,
  Select,
  Label,
} from "semantic-ui-react";

function App() {
  const [users, setUsers] = useState([
    { name: "Ankit Lale", favorite: false },
    { name: "Kajal Dalai", favorite: true },
    { name: "Prajakta Parab", favorite: false },
    { name: "Prajakta Yadav", favorite: true },
    { name: "Sagar Pednekar", favorite: false },
  ]);
  const [friendList, setFriendList] = useState([]);
  const [displayUsers, setDisplayUsers] = useState([]);

  const [enableSearch, toggleEnableSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const PAGINATION_COUNT = 4; // displays 4 results

  useEffect(() => {
    const usersData = users.slice(0, PAGINATION_COUNT);
    setDisplayUsers(usersData);
  }, [users]);

  const handleUserSearch = (name) => {
    if (name) {
      const matchingUsers = checkIfAlreadyFriend(name);
      if (matchingUsers.length) {
        toggleEnableSearch(true);
        setFriendList(matchingUsers);
        return;
      }
    }
    toggleEnableSearch(false);
    setUsers(users);
  };

  const checkIfAlreadyFriend = (name) => {
    return users?.filter((friend) =>
      friend?.name.toLowerCase().includes(name.toLowerCase())
    );
  };

  const handleEnterClick = (e) => {
    if (searchQuery && e.key === "Enter") {
      setUsers([...users, { name: searchQuery, favorite: false }]);
      setSearchQuery("");
    }
  };

  const deleteUser = (name) => {
    if (name) {
      const updatedUsers = users?.filter(
        (friend) => friend?.name.toLowerCase() !== name.toLowerCase()
      );
      setUsers(updatedUsers);
    }
  };

  const toggleFavorite = (user) => {
    const updatedUsers = users.filter((friend) => {
      return friend?.name.toLowerCase() !== user.name.toLowerCase();
    });
    if (!user.favorite) {
      updatedUsers.unshift({ ...user, favorite: true });
      setUsers(updatedUsers);
      return;
    }
    updatedUsers.push({ ...user, favorite: false });
    setUsers(updatedUsers);
  };

  const sortByFavorites = () => {
    const nonfavorites = users.filter((user) => {
      return !user.favorite;
    });

    const favorites = users.filter((user) => {
      return user.favorite;
    });

    setUsers([...favorites, ...nonfavorites]);
  };

  const sortByName = () => {
    const updatedUsers = users.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
    setUsers([...updatedUsers]);
  };

  const handlePagination = (currentPageNo) => {
    if (currentPageNo > 1) {
      const end = PAGINATION_COUNT * currentPageNo;
      const paginatedUsers = users.slice(end - PAGINATION_COUNT, end);
      setDisplayUsers(paginatedUsers);
      return;
    }
    const usersData = users.slice(0, PAGINATION_COUNT);
    setDisplayUsers(usersData);
  };

  const options = [
    { key: "byFavorites", text: "Sort by Favorites", value: "byFavorites" },
    { key: "byName", text: "Sort By Name", value: "byName" },
  ];

  const handleSort = (e, selection) => {
    switch (selection?.value) {
      case "byName":
        return sortByName();
      case "byFavorites":
        return sortByFavorites();
      default:
        return;
    }
  };

  return (
    <Container>
      <div>
        {/* {console.log("props", props, usersData)} */}
        <Header as="h2" icon textAlign="center">
          <Icon name="users" circular />
          <Header.Content>Friends List</Header.Content>
        </Header>
        <Input
          fluid
          type="text"
          placeholder="Enter your friends Name"
          onChange={(e) => {
            setSearchQuery((e?.target?.value).replace(/^[ ]+$/g, ""));
            handleUserSearch(e?.target?.value.replace(/^[ ]+$/g, ""));
          }}
          onKeyDown={(e) => handleEnterClick(e)}
          value={searchQuery}
        >
          <input />
          <Select
            compact
            options={options}
            defaultValue="byFavorites"
            onChange={(e, v) => handleSort(e, v)}
          />
        </Input>

        <>
          {!enableSearch && searchQuery && (
            <Label pointing>
              Press enter to add {searchQuery} as new Friend
            </Label>
          )}
        </>

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

        <>
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
        </>

        <Button.Group basic size="small">
          {[...Array(Math.ceil(users.length / PAGINATION_COUNT))].map(
            (_, index) => {
              return (
                <Button
                  key={index}
                  onClick={() => handlePagination(index + 1)}
                  value={index + 1}
                >
                  {index + 1}
                </Button>
              );
            }
          )}
        </Button.Group>
      </div>
    </Container>
  );
}

export default App;
