class Entry < ApplicationRecord
    # validazioni base
    validates :content, presence: true
    validates :mood_score, presence: true, inclusion: { in: 1..5 }
    validates :entry_date, presence: true, uniqueness: true
end
