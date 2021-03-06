import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import './Journal.scss';
import Spinner from '../shared/Spinner/Spinner';

const page = 'journals';

class Journals extends Component {
  constructor(props) {
    super(props);
    this.state = {
      journals: [],
    };

    this.renderJournalEntries = this.renderJournalEntries.bind(this);
  }

  async componentDidMount() {
    await this.props.getUsersEntries(page);
  }

  renderJournalEntries(journal) {
    const date = moment(journal.created_at).format('D/MM/YYYY');

    return (
      <Link
        to={{
          pathname: `/dashboard/journals/${journal.id}`,
        }}
        key={journal.id}
        className="journal__entry"
      >
        <div className="journal__entry-title">{journal.title}</div>
        <div className="journal__entry-categories">{journal.category.name}</div>
        <div className="journal__entry-date">{date}</div>
      </Link>
    );
  }

  render() {
    const { journals, totalPages } = this.props.state;
    const { currPage, prevPage, nextPage, loading } = this.props;

    return (
      <>
        <div className="journal">
          <div className="page-header">
            <h1>Journals</h1>
            <Link to="/dashboard/journals/new" className="btn add-journal">
              <i className="fas fa-plus-circle"></i>
            </Link>
          </div>

          <div className="journal__entries">
            <div className="pagination-btns">
              <button onClick={() => prevPage('journals')}>Prev</button>
              <div className="total-pages">
                {currPage} / {totalPages}
              </div>
              <button onClick={() => nextPage('journals')}>Next</button>
            </div>
            <div className="journal__columns">
              <div className="journal__title" onClick={() => this.props.sortByType('title', page)}>
                <span>Title</span>
                <i className="fas fa-sort"></i>
              </div>
              <div className="journal__category" onClick={() => this.props.sortByType('category', page)}>
                <span>Category</span>
                <i className="fas fa-sort"></i>
              </div>
              <div className="journal-date" onClick={() => this.props.sortByType('created_at', page)}>
                <span>Date</span>
                <i className="fas fa-sort"></i>
              </div>
            </div>
            {loading === false && journals ? (
              journals.map((journal) => this.renderJournalEntries(journal))
            ) : (
              <Spinner />
            )}
          </div>
        </div>
      </>
    );
  }
}

export default Journals;
