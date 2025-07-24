"use client"

import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { Slot } from "@radix-ui/react-slot"
import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
  FormProvider,
  useFormContext,
} from "react-hook-form"

import { cn } from "@/core/utils/cn"
import { Label } from "@/components/ui/label"

const Form = FormProvider

/**
 * @typedef {Object} FormFieldContextValue
 * @property {TName} name - The name of the form field.
 * @template TFieldValues - The type of the form field values.
 * @template TName - The type of the field path.
 */
type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  name: TName
}

const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue
)

/**
 * @typedef {Object} FormFieldProps
 * @extends ControllerProps
 * @template TFieldValues - The type of the form field values.
 * @template TName - The type of the field path.
 */

/**
 * Provides context for a form field and renders a Controller.
 * @param {FormFieldProps<TFieldValues, TName>} props - The properties for the FormField component.
 * @returns {JSX.Element}
 * @template TFieldValues - The type of the form field values.
 * @template TName - The type of the field path.
 */
const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  )
}

/**
 * Custom hook to access form field context and state.
 * @returns {Object} An object containing field information and state.
 */
const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext)
  const itemContext = React.useContext(FormItemContext)
  const { getFieldState, formState } = useFormContext()

  const fieldState = getFieldState(fieldContext.name, formState)

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>")
  }

  const { id } = itemContext

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  }
}

/**
 * @typedef {Object} FormItemContextValue
 * @property {string} id - The unique ID of the form item.
 */
type FormItemContextValue = {
  id: string
}

const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue
)

/**
 * @typedef {Object} FormItemProps
 * @extends React.HTMLAttributes<HTMLDivElement>
 */

/**
 * Provides context for a form item and renders a div with space-y-2.
 * @param {FormItemProps} props - The properties for the FormItem component.
 * @param {React.Ref<HTMLDivElement>} ref - Ref to the HTML div element.
 * @returns {JSX.Element}
 */
const FormItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const id = React.useId()

  return (
    <FormItemContext.Provider value={{ id }}>
      <div ref={ref} className={cn("space-y-2", className)} {...props} />
    </FormItemContext.Provider>
  )
})
FormItem.displayName = "FormItem"

/**
 * @typedef {Object} FormLabelProps
 * @extends React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
 */

/**
 * Renders a label for a form field, applying destructive styling if there's an error.
 * @param {FormLabelProps} props - The properties for the FormLabel component.
 * @param {React.Ref<React.ElementRef<typeof LabelPrimitive.Root>>} ref - Ref to the LabelPrimitive.Root element.
 * @returns {JSX.Element}
 */
const FormLabel = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => {
  const { error, formItemId } = useFormField()

  return (
    <Label
      ref={ref}
      className={cn(error && "text-destructive", className)}
      htmlFor={formItemId}
      {...props}
    />
  )
})
FormLabel.displayName = "FormLabel"

/**
 * @typedef {Object} FormControlProps
 * @extends React.ComponentPropsWithoutRef<typeof Slot>
 */

/**
 * Renders a form control using a Slot component, linking it to form field context.
 * @param {FormControlProps} props - The properties for the FormControl component.
 * @param {React.Ref<React.ElementRef<typeof Slot>>} ref - Ref to the Slot element.
 * @returns {JSX.Element}
 */
const FormControl = React.forwardRef<
  React.ElementRef<typeof Slot>,
  React.ComponentPropsWithoutRef<typeof Slot>
>(({ ...props }, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField()

  return (
    <Slot
      ref={ref}
      id={formItemId}
      aria-describedby={
        !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      {...props}
    />
  )
})
FormControl.displayName = "FormControl"

/**
 * @typedef {Object} FormDescriptionProps
 * @extends React.HTMLAttributes<HTMLParagraphElement>
 */

/**
 * Renders a description for a form field.
 * @param {FormDescriptionProps} props - The properties for the FormDescription component.
 * @param {React.Ref<HTMLParagraphElement>} ref - Ref to the HTML paragraph element.
 * @returns {JSX.Element}
 */
const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  const { formDescriptionId } = useFormField()

  return (
    <p
      ref={ref}
      id={formDescriptionId}
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
})
FormDescription.displayName = "FormDescription"

/**
 * @typedef {Object} FormMessageProps
 * @extends React.HTMLAttributes<HTMLParagraphElement>
 * @property {React.ReactNode} [children] - The child components to be rendered within the message.
 */

/**
 * Renders an error message for a form field.
 * @param {FormMessageProps} props - The properties for the FormMessage component.
 * @param {React.Ref<HTMLParagraphElement>} ref - Ref to the HTML paragraph element.
 * @returns {JSX.Element | null}
 */
const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  const { error, formMessageId } = useFormField()
  const body = error ? String(error?.message) : children

  if (!body) {
    return null
  }

  return (
    <p
      ref={ref}
      id={formMessageId}
      className={cn("text-sm font-medium text-destructive", className)}
      {...props}
    >
      {body}
    </p>
  )
})
FormMessage.displayName = "FormMessage"

export {
  useFormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
}
