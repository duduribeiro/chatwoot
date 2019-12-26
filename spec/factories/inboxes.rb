# frozen_string_literal: true

FactoryBot.define do
  factory :inbox do
    account
    channel { build(:channel_widget) }
    name { 'Inbox' }

    after(:create) do |inbox|
      inbox.channel.save!
    end
  end
end
