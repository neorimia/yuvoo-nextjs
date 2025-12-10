import React from 'react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const PaginationData: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    return (
        <div className="row">
            <div className="col-12">
                <div className="bd-pagination pt-20 wow fadeInUp" data-wow-duration="1s" data-wow-delay=".3s">
                    <ul className="justify-content-center">
                        <li className={`page-item`}>
                            <button type='button' className={`page-numbers ${currentPage === 1 ? 'disabled' : ''}`} onClick={() => onPageChange(currentPage - 1)}><i className="fa-sharp fa-solid fa-angle-left"></i></button>
                        </li>
                        {Array.from({ length: totalPages }, (_, index) => (
                            <li key={index + 1} className={`page-item`}>
                                <button type='button' className={`page-numbers ${currentPage === index + 1 ? 'current' : ''}`} onClick={() => onPageChange(index + 1)}>{index + 1}</button>
                            </li>
                        ))}
                        <li className={`page-item`}>
                            <button type='button' className={`page-numbers ${currentPage === totalPages ? 'disabled' : ''}`} onClick={() => onPageChange(currentPage + 1)}><i className="fa-sharp fa-solid fa-angle-right"></i></button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default PaginationData;