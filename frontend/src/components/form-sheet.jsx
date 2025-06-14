import { useEffect, useMemo, useCallback } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { SelectInput } from "./select-input";
import { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Loader2 } from "lucide-react";

// Dynamic Schema Generator
const createSchema = (fields) =>
  z.object(
    fields.reduce((acc, field) => {
      let validator;

      switch (field.type) {
        case "text":
        case "textarea":
          validator = z.string().trim();
          if (field.required) {
            validator = validator.min(1, `${field.label} is required`);
          }
          break;
        case "number":
          validator = z.preprocess(
            (val) => (val === "" ? undefined : Number(val)),
            z
              .number({ invalid_type_error: `${field.label} must be a number` })
              .min(0, "Value must be greater than or equal to zero")
          );
          break;
        case "email":
          validator = z.string().trim().email("Invalid email address");
          break;
        case "checkbox":
          validator = z.boolean();
          break;
        case "hidden":
          validator = z.any();
          break;
        default:
          validator = z.string();
          break;
      }

      // ✅ Only apply `.optional()` if `required: false`
      if (!field.required) {
        validator = validator.optional();
      }

      acc[field.name] = validator;
      return acc;
    }, {})
  );

const FormSheet = ({
  title = "Edit",
  description,
  fields,
  data,
  onSubmit,
  trigger = "Edit",
  submitLabel = "Save changes",
}) => {
  const schema = useMemo(() => createSchema(fields), [fields]);
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  useEffect(() => {
    form.reset(data ?? {});
  }, [data, form, open]);

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        document.activeElement?.blur(); // Removes focus from any element
      }, 0);
    }
  }, [open]);

  const handleSubmit = async (values) => {
    setIsSubmitting(true);
    try {
      await onSubmit(values);
      setOpen(false); // No need for setTimeout
    } catch (error) {
      form.setError("root", {
        type: "manual",
        message: error instanceof Error ? error.message : "An error occurred",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderField = useCallback((fieldConfig, formField) => {
    if (fieldConfig.component) {
      return <fieldConfig.component {...formField} {...fieldConfig} />;
    }

    switch (fieldConfig.type) {
      case "textarea":
        return (
          <Textarea
            {...formField}
            placeholder={fieldConfig.label}
            autoComplete={fieldConfig.autoComplete}
          />
        );
      case "checkbox":
        return (
          <Checkbox
            checked={!!formField.value}
            onCheckedChange={formField.onChange}
          />
        );
      case "select":
        return (
          <Controller
            control={form.control}
            name={fieldConfig.name}
            render={({ field }) => (
              <SelectInput
                {...field}
                options={fieldConfig.options}
                selectLabel={fieldConfig.selectLabel}
                placeholder={fieldConfig.placeholder}
                onValueChange={(val) => {
                  field.onChange(val);
                  fieldConfig.onchange?.(val); // call custom onchange if exists
                }}
              />
            )}
          />
        );

      case "hidden":
        return <input type="hidden" {...formField} />;
      default:
        return (
          <Input
            {...formField}
            value={formField.value ?? ""}
            type={fieldConfig.type}
            placeholder={fieldConfig.label}
            autoComplete={fieldConfig.autoComplete}
          />
        );
    }
  }, []);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <div onClick={(e) => e.stopPropagation()}>{trigger}</div>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className="pb-0">
          <SheetTitle>{title}</SheetTitle>
          {description && <SheetDescription>{description}</SheetDescription>}
        </SheetHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6 px-4"
          >
            {fields.map((field) => (
              <FormField
                key={field.name}
                control={form.control}
                name={field.name}
                render={({ field: formField }) => (
                  <FormItem>
                    {field.type !== "hidden" && field.type !== "checkbox" && (
                      <FormLabel>{field.label}</FormLabel>
                    )}
                    <FormControl>
                      <div className="flex items-center gap-3">
                        {renderField(field, formField)}
                        {field.type === "checkbox" && (
                          <FormLabel className="!mt-0" htmlFor={formField.id}>
                            {field.label}
                          </FormLabel>
                        )}
                      </div>
                    </FormControl>
                    {field.description && (
                      <p className="text-sm text-muted-foreground">
                        {field.description}
                      </p>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}

            {form.formState.errors.root && (
              <p className="text-sm font-medium text-destructive">
                {form.formState.errors.root.message}
              </p>
            )}

            <SheetFooter className="-p-4">
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                {submitLabel}
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpen(false);
                }}
              >
                Cancel
              </Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
};

export default FormSheet;
