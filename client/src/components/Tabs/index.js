/*global chrome*/
import React, { useState, useEffect, useContext } from 'react';
import AuthMethods from '../../helpers/AuthMethods';
import { backendPostFn, handleChange } from '../../helpers';
import Modal from '../Modal';
import { UserContext } from '../Layout';

export default function Tabs() {
  const [tabs, setTabs] = useState([]);
  const [modal, setModal] = useState(false);
  const [input, setInput] = useState({
    title: '',
    url: ''
  });
  const { userState } = useContext(UserContext);

  const fetchTabs = async () => {
    const url = process.env.REACT_APP_BACKEND_URL + '/bookmarks';
    const token = await AuthMethods.getToken();
    const dbTabs = await fetch(url, {
      headers: { 'x-token': token }
    })
      .then(res => res.json())
      .catch(err => err);
    setTabs(dbTabs);
  };

  const createTab = async (tab = {}) => {
    Object.keys(tab).length > 0
      ? await backendPostFn({ ...tab, uid: userState.uid }, 'bookmark/create')
      : await backendPostFn(
          { ...input, uid: userState.uid },
          'bookmark/create'
        );
    setModal(false);
    fetchTabs();
  };

  const deleteTab = async tabUrl => {
    await backendPostFn(
      { uid: userState.uid, url: tabUrl },
      'bookmark/delete',
      'DELETE',
      await AuthMethods.getToken()
    );
    fetchTabs();
  };

  const renderModal = () => (
    <Modal
      show={modal}
      closeModal={() => setModal(false)}
      title="Create tab"
      body="create tabs"
      confirmFn={createTab}
    >
      {['title', 'url'].map(item => (
        <div key={item}>
          <label htmlFor={`input_${item}`}>{item}</label>
          <input name={item} onChange={e => handleChange(e, setInput, input)} />
        </div>
      ))}
    </Modal>
  );

  useEffect(() => {
    fetchTabs();
  }, []);

  const getCurTab = () => {
    chrome.tabs.query({ currentWindow: true, active: true }, async tabs => {
      const { url, title, favIconUrl } = tabs[0];
      createTab({ url, title, favIconUrl });
    });
  };

  return (
    <>
      <div className="tabs-create" onClick={() => setModal(true)}>
        <i className="fas fa-plus-circle mr-3" />
        <span>Create new tab</span>
      </div>
      <div className="tabs-create" onClick={getCurTab}>
        <i className="fas fa-plus-circle mr-3" />
        <span>Save current tab</span>
      </div>

      {renderModal()}

      <div className="tabs">
        {tabs.map((tab, i) => (
          <div className="card" key={tab + `_${i}`}>
            {tab.favIconUrl && (
              <img src={tab.favIconUrl} alt={tab.title} className="favicon" />
            )}
            <a
              className="tabs-anchor"
              href={tab.url}
              rel="noopener noreferrer"
              target="_blank"
            >
              <span>{tab.title}</span>
              {/* <span>{tab.url}</span> */}
            </a>
            <i className="fas fa-times" onClick={() => deleteTab(tab.url)} />
          </div>
        ))}
      </div>
    </>
  );
}
