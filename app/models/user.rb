class User < ApplicationRecord
  # Devise modules
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  include DeviseTokenAuth::Concerns::User

  has_many :orders

  # Define enum for roles
   # Enum for roles
  # enum role: { user: 0, admin: 1 }, _suffix: true
  def self.roles
    { user: 0, admin: 1 }
  end
  
  def role
    self.class.roles.key(self[:role])&.to_s
  end

  def role=(value)
    self[:role] = self.class.roles[value.to_sym]
  end
  
  
  def admin?
    role == 'admin'
  end
  
  
  # Validations
  validates :first_name, :last_name, presence: true
  validates :email, presence: true, uniqueness: true


  
end
