import {BudgetObject} from "@/model/BudgetTypes";
import {FILL_UP, HAVE_BALANCE, MONTHLY, SET_ASIDE, WEEKLY} from "@/model/Target";

export const sampleBudget: BudgetObject = {
    metadata: {
        totalAvailable: 6000,
    },
    budget: [{
        categoryName: 'Needs',
        isSelected: false,
        lineItems: [
            {
                lineItem: 'Rent',
                assigned: 1800,
                activity: 1601,
                isSelected: false,
                target: {
                    amount: 1800,
                    type: SET_ASIDE,
                    timeframe: MONTHLY,
                    due: new Date(2025, 1, 23),
                }
            },
            {
                lineItem: 'Apartment',
                assigned: 400,
                activity: 150,
                isSelected: false,
                target: {
                    amount: 300,
                    type: SET_ASIDE,
                    timeframe: MONTHLY,
                    due: new Date(2025, 1, 20),
                }
            },
            {
                lineItem: 'Groceries',
                assigned: 450,
                activity: 100,
                isSelected: false
            }
        ],
    },
        {
            categoryName: 'Wants',
            isSelected: false,
            lineItems: [
                {
                    lineItem: 'Restaurants',
                    assigned: 300,
                    activity: 143.23,
                    isSelected: false,
                    target: {
                        amount: 100,
                        timeframe: WEEKLY,
                        type: HAVE_BALANCE,
                        due: new Date(2025, 1, 16),
                    }
                },
                {
                    lineItem: 'Fun',
                    assigned: 350,
                    activity: 134,
                    isSelected: false,
                    target: {
                        amount: 350,
                        type: HAVE_BALANCE,
                    }
                },
                {
                    lineItem: 'Clothes',
                    assigned: 234,
                    activity: 192,
                    isSelected: false,
                    target: {
                        amount: 400,
                        type: FILL_UP,
                    }
                }
            ]
        }
    ]
};