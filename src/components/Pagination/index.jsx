import PropTypes from 'prop-types';
import React from 'react';
import ReactPaginate from 'react-paginate';
import './Pagination.scss';

Pagination.propTypes = {
    page: PropTypes.number,
    totalPages: PropTypes.number,
    onPaginationClick: PropTypes.func,
};

function Pagination({ page, totalPages, onPaginationClick }) {
    const hanldePaginationClick = (data) => {
        if (onPaginationClick) {
            onPaginationClick(data.selected + 1);
        }
    };

    return (
        <div className='pagination-container'>
            <ReactPaginate
                previousLabel='&larr;'
                nextLabel='&rarr;'
                breakLabel={'...'}
                breakClassName={'break-me'}
                pageCount={totalPages}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={hanldePaginationClick}
                disableInitialCallback={true}
                containerClassName={'pagination'}
                subContainerClassName={'pages pagination'}
                activeClassName={'active'}
            />
        </div>
    );
}

export default Pagination;
