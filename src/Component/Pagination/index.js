import PropTypes from "prop-types";
import { Button } from "semantic-ui-react";
const Pagination = ({ handlePagination, users, paginationCount }) => {
  return (
    <Button.Group basic size="small">
      {[...Array(Math.ceil(users.length / paginationCount))].map((_, index) => {
        return (
          <Button
            key={index}
            onClick={() => handlePagination(index + 1)}
            value={index + 1}
          >
            {index + 1}
          </Button>
        );
      })}
    </Button.Group>
  );
};

Pagination.propTypes = {
  handlePagination: PropTypes.func.isRequired,
  users: PropTypes.array.isRequired,
  paginationCount: PropTypes.number.isRequired,
};
export default Pagination;
