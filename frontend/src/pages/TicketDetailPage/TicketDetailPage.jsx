import ticketprice from '../../assets/giave.png';
import './TicketDetailStyle.css'

function TicketDetail() {
    return (
        <div className="ticket-container">
            <img 
                src={ticketprice} 
                alt="Bảng giá vé KOF Cinema"
            />
        </div>
    );
}

export default TicketDetail;