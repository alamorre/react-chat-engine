import React, { Component } from 'react'

import _ from 'lodash'

import ChatForm from './NewChatForm'
import ChatCard from './ChatCard'

class ChatList extends Component {
    readLastMessage(chat) {
        let readLastMessage = true
        chat.people.map(chat_person => {
            if(this.props.userName === chat_person.person.username) {
                readLastMessage = chat.last_message.id === chat_person.last_read
            }
        })
        return readLastMessage
    }

    renderChats(chats) {
        return chats.map((chat, index) => {
            if (!chat) return <div key={`chat_${index}`} />

            if (this.props.renderChatCard) {
                return <div key={`chat_${index}`}>{this.props.renderChatCard(chat, index)}</div>
            } else {
                return <ChatCard key={`chat_${index}`} {...this.props} chat={chat} />
            }
        })
    }

    render() {       
        const chats = this.props.chats ? Object.values(this.props.chats) : []
        chats.sort((a, b) => { 
            const aDate = a.last_message.created ? new Date(a.last_message.created) : new Date(a.created)
            const bDate = b.last_message.created ? new Date(b.last_message.created) : new Date(b.created)
            return new Date(bDate) - new Date(aDate); 
        })

        return (
            <div style={styles.chatListContainer} className='ce-chat-list'>

                <div style={styles.chatsContainer} className='ce-chats-container'>

                    { this.renderChats(chats) } 

                    <div style={{ height: '64px' }} />

                    {
                        this.props.renderNewChatForm ?
                        this.props.renderNewChatForm(this.props) :
                        <div style={styles.newChatContainer} className='ce-chat-form-container'>
                            <ChatForm {...this.props}  className='ce-chat-form' />
                        </div>
                    }
                    
                </div>

            </div>
        )
    }
}

const styles={
    chatListContainer: { 
        height: '100%', 
        maxHeight: '100vh', 
        overflow: 'scroll', 
        overflowX: 'hidden',
        borderRight: '1px solid #afafaf', 
        backgroundColor: 'white' 
    },
    chatsContainer: { 
        width: '100%', 
        backgroundColor: 'white', 
        borderRadius: '0px 0px 24px 24px'
    },
    chatContainer: { 
        padding: '16px', 
        paddingBottom: '12px',
        cursor: 'pointer'
    },
    titleText: { 
        fontWeight: '500',
         paddingBottom: '4px', 
         whiteSpace: 'nowrap', 
         overflow: 'hidden' 
    },
    messageText: {
        width: '75%',
        color: 'rgba(153, 153, 153, 1)', 
        fontSize: '14px', 
        whiteSpace: 'nowrap', 
        overflow: 'hidden',
        display: 'inline-block'
    },
    activeChat: {
        backgroundColor: '#d9d9d9',
        border: '4px solid white',
        borderRadius: '12px'
    },
    newChatContainer: { 
        position: 'absolute', 
        bottom: '0px', 
        padding: '12px',
        width: 'calc(100% - 25px)',
        backgroundColor: 'white'
    }
}

export default ChatList;
