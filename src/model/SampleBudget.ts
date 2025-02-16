import {Budget} from "@/model/BudgetTypes";
import {TargetTimeframe, TargetType, Weekday} from "@/model/Target";

export const sampleBudget: Budget = [
    {
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
                    type: TargetType.SET_ASIDE,
                    timeframe: TargetTimeframe.MONTHLY,
                    due: 1,
                }
            },
            {
                lineItem: 'Apartment',
                assigned: 400, activity: 150,
                isSelected: false,
                target: {
                    amount: 300,
                    type: TargetType.SET_ASIDE,
                    timeframe: TargetTimeframe.MONTHLY,
                    due: 1,
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
                    timeframe: TargetTimeframe.WEEKLY,
                    type: TargetType.HAVE_BALANCE,
                    due: Weekday.SUNDAY,
                }
            },
            {
                lineItem: 'Fun',
                assigned: 350,
                activity: 134,
                isSelected: false,
                target: {
                    amount: 350,
                    type: TargetType.HAVE_BALANCE,
                }
            },
            {
                lineItem: 'Clothes',
                assigned: 234,
                activity: 192,
                isSelected: false,
                target: {
                    amount: 400,
                    type: TargetType.FILL_UP,
                }
            }
        ]
    }
];