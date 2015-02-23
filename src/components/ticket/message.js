var moment = require('moment');
var React = require('react');
var Timestamp = require('react-time');
var lib = require('lib');


var MessageList = React.createClass({
    propTypes: {
        messages: React.PropTypes.array.isRequired
    },
    render: function () {
        var timestampedMessages = this.props.messages.map(function (message) {
            message.key = message.pk;
            message.thread_uuid = message.thread.pk;

            return (<TimestampedMessage {...message} />);
        });

        return (
            <div className="messages container-fluid">
                {timestampedMessages}
            </div>
        );
    }
});


var TimestampedMessage = React.createClass({
    propTypes: {
        created: React.PropTypes.string.isRequired
    },
    render: function () {
        var timestamp = this.props.created;

        return (
            <div className="timestamped-message">
                <MessageTimestamp timestamp={timestamp} />
                <Message {...this.props} />
            </div>
        );
    }
});


var MessageTimestamp = React.createClass({
    propTypes: {
        timestamp: React.PropTypes.string.isRequired
    },
    render: function () {
        var timestamp = moment(this.props.timestamp).format('lll');

        return (
            <div className="timestamp">
                <time className="badge"
                    dateTime={this.props.timestamp}>
                    {timestamp}
                </time>
            </div>
        );
    }
});


var Message = React.createClass({
    propTypes: {
        body: React.PropTypes.string.isRequired,
        sender: React.PropTypes.object.isRequired,
        thread: React.PropTypes.object.isRequired
    },
    render: function () {
        var [r, g, b] = lib.color.UUIDToRGB(
            this.props.thread_pk,
            {
                s: 1,
                l: 0.7
            }
        );

        var style = {
            borderColor: `rgb(${r}, ${g}, ${b})`
        };

        var colClasses = React.addons.classSet({
            'col-sm-8': true,
            'col-sm-offset-4': this.props.sender.user
        });

        return (
            <article className="row message">
                <div className={colClasses}>
                    <div style={style} className="panel panel-default">
                        <div className="panel-heading">
                            <i className="fa fa-comment"></i>
                            {' '}
                            {this.props.sender.display_name}
                        </div>
                        <div className="panel-body">
                            <div className="message-body">
                                {this.props.body}
                            </div>
                        </div>
                    </div>
                </div>
            </article>
        );
    }
})


module.exports.MessageList = MessageList;