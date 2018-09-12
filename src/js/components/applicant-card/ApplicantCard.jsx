import React from "react";
import PropTypes from 'prop-types';
import './style.scss';
import Avatar from '../avatar';
import Stars from '../stars';
import Theme from '../theme';
import AcceptReject from '../accept-reject';
/**
 * Applican Card
 */
const ApplicantCard = (props) => {
    return (<Theme.Consumer>
        {({bar}) => 
            (<li className="aplicantcard">
                <Avatar url={process.env.API_HOST+props.applicant.profile.picture} />
                <AcceptReject
                    onAccept={() => props.onAccept(props.shift.id, props.applicant)} 
                    onReject={() => props.onReject(props.shift.id, props.applicant)} 
                />
                <a href="#" className="shift-position">{props.applicant.profile.user.first_name + " " + props.applicant.profile.user.last_name}</a>
                <Stars rating={Number(props.applicant.rating)}  />
            </li>)}
    </Theme.Consumer>);
};
ApplicantCard.propTypes = {
  applicant: PropTypes.object.isRequired,
  shift: PropTypes.object.isRequired,
  onAccept: PropTypes.func.isRequired,
  onReject: PropTypes.func.isRequired
};

export default ApplicantCard;