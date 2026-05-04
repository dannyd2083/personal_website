

const VisitChips = ({ visits, activeVisit, onVisitChange }) => {
    return(
        <div>
            <button
                onClick={() => onVisitChange(null)}
                className={`${activeVisit === null ? 'bg-clay-court-dark text-clay-cream' : 'bg-clay-dust text-clay-court-dark'} px-4 py-1.5 rounded-full text-sm`}
            >
                All visits
            </button>
            {visits.map(visit => (
                <button
                    key={visit.id}
                    onClick={() => onVisitChange(visit.id)}
                    className={`${activeVisit === visit.id ? 'bg-clay-court-dark text-clay-cream' : 'bg-clay-dust text-clay-court-dark'} px-4 py-1.5 rounded-full text-sm`}
                >
                    {visit.name}
                </button>
            ))}
        </div>
    )

}

export default VisitChips;