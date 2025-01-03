class Item < ApplicationRecord


  
  has_many :order_descriptions, dependent: :destroy
  validates :name, :description, :price, presence: true
  validates :price, numericality: { greater_than_or_equal_to: 0 }
end
