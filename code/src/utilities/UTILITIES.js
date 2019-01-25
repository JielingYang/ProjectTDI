import Base from "../classes/Base";
import BaseModel from "../classes/BaseModel";

export const CLASS_NAMES = Object.freeze({
    Base: "Base",
});

/**
 * This function do a deep copy on given object (including array) and return copied result.
 * @param originalObject
 * @returns {*}
 */
export const deepCopy = (originalObject) =>
{
    if (originalObject instanceof BaseModel)
    {
        return originalObject.deepClone();
    }

    let copiedObject = Array.isArray(originalObject)
                       ? []
                       : {};

    for (let key in originalObject)
    {
        if (originalObject.hasOwnProperty(key))
        {
            let o = originalObject[key];

            // If target is Base class object
            if (o instanceof BaseModel)
            {
                // Call class object deepClone method
                copiedObject[key] = o.deepClone();
            }
            else
            {
                copiedObject[key] = (typeof o === "object")
                                    ? deepCopy(o)
                                    : o;
            }
        }
    }
    return copiedObject;
};

/**
 * Convert a number to string in percentage
 * @param number
 * @param digit
 * @returns {string}
 */
export const numberToPercentageString: string = (number: number, digit: number) =>
{
    let numberInString: string;
    if (digit === undefined || digit === null || digit < 0 || digit > 100)
    {
        numberInString = Number(number).toFixed(2);
    }
    else
    {
        numberInString = Number(number).toFixed(digit);
    }
    return numberInString + "%";
};

/**
 * With number of sides and inner radius length, calculate side length of a regular polygon
 * @param numberOfSides
 * @param innerRadius
 * @returns {number}
 */
export const getRegularPolygonSideLength: number = (numberOfSides: number, innerRadius: number) =>
{
    return 2 * innerRadius * Math.tan(Math.PI / numberOfSides)
};

/**
 * Check if a number is even
 * @param number
 * @returns {boolean}
 */
export const isEven: boolean = (number: number) =>
{
    return number % 2 === 0
};

export const isUndefineOrNull: boolean = (target) =>
{
    return target === undefined || target === null
};

export const getViewportMin: number = () =>
{
    return window.innerWidth < window.innerHeight
           ? window.innerWidth
           : window.innerHeight;
};
