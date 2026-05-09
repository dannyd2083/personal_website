const VisitChips = ({ visits, activeVisit, onVisitChange }) => {
    return (
        <div className="flex gap-2 px-6 py-4 overflow-x-auto">
            <button
                onClick={() => onVisitChange(null)}
                className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm transition-colors ${activeVisit === null ? 'bg-clay-court-dark text-clay-cream' : 'bg-clay-dust text-clay-court-dark hover:bg-clay-court hover:text-clay-cream'}`}
            >
                All visits
            </button>
            {visits.map(visit => (
                <button
                    key={visit.id}
                    onClick={() => onVisitChange(visit.id)}
                    className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm transition-colors ${activeVisit === visit.id ? 'bg-clay-court-dark text-clay-cream' : 'bg-clay-dust text-clay-court-dark hover:bg-clay-court hover:text-clay-cream'}`}
                >
                    {visit.name}
                </button>
            ))}
        </div>
    )
}

export default VisitChips;