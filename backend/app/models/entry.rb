class Entry < ApplicationRecord
    # validazioni base
    validates :content, presence: true
    validates :mood_score, presence: true, inclusion: { in: 1..5 }

    # validazioni personalizzate
    validate :only_one_entry_per_day # per assicurare una sola entry al giorno

    private

    def only_one_entry_per_day
        today = Time.current.to_date
        # escludiamo l'entry corrente altrimenti l'update fallirebbe sempre
        existing = Entry.where("DATE(created_at) = ?", today).where.not(id: id).exists?
        errors.add(:base, "Esiste già una entry per questo giorno") if existing
    end
end
