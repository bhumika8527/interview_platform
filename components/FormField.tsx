import React from 'react'
import {FormControl , FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input"  
import { Controller, FieldValues} from   "react-hook-form";

interface ControlledFieldProps<T extends FieldValues> {
  control: any;
  name: keyof T;
  label: string;
  placeholder: string;
  type ?: string;
}

const ControlledField = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  type = "text",
}: ControlledFieldProps<T>) => (
  <Controller
    name={name as string}
    control={control}
    render={({ field }) => (
      <FormItem>
        <FormLabel className="label">{label}</FormLabel>
        <FormControl>
          <Input
         
           className="input"
            placeholder={placeholder}
            type= {'inputType'}
             {...field} />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);

export default ControlledField;