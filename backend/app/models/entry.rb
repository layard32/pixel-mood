class Entry < ApplicationRecord
    # validazioni base
    validates :content, presence: true
    validates :mood_score, presence: true, inclusion: { in: 1..10 }

    # validazioni personalizzate
    validate :only_one_entry_per_day # per assicurare una sola entry al giorno

    private

    def only_one_entry_per_day
        today = Time.current.to_date
        start_of_day = today.beginning_of_day
        end_of_day = today.end_of_day
        # escludiamo l'entry corrente altrimenti l'update fallirebbe sempre
        existing = Entry.where(created_at: start_of_day..end_of_day).where.not(id: id).exists?
        errors.add(:base, "Esiste già una entry per questo giorno") if existing
    end
end